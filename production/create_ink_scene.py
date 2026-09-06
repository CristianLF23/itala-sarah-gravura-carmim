import bpy
import math
from pathlib import Path

root=Path(__file__).resolve().parent.parent
out=root/'production'/'blender'
out.mkdir(parents=True, exist_ok=True)
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
scene=bpy.context.scene
scene.render.engine='CYCLES'
scene.cycles.samples=24
scene.cycles.use_denoising=True
scene.render.resolution_x=720
scene.render.resolution_y=960
scene.render.resolution_percentage=100
scene.render.image_settings.file_format='PNG'
scene.render.fps=24
scene.frame_start=1
scene.frame_end=120
scene.world.color=(.045,.035,.03)

bpy.ops.mesh.primitive_grid_add(x_subdivisions=100,y_subdivisions=140,size=2,location=(0,0,0))
surface=bpy.context.object
surface.name='Pigmento em relevo'
for vertex in surface.data.vertices:
    x,y=vertex.co.x*1.9,vertex.co.y*2.6
    vertex.co=(x,y,.09*math.sin(x*1.3)*math.cos(y*.9)+.018*math.sin(y*5+x*2))
for poly in surface.data.polygons: poly.use_smooth=True
sub=surface.modifiers.new('Continuidade da superficie','SUBSURF')
sub.levels=1
sub.render_levels=1
material=bpy.data.materials.new('Tinta preta, osso e carmim')
material.use_nodes=True
nodes=material.node_tree.nodes
links=material.node_tree.links
bsdf=nodes.get('Principled BSDF')
bsdf.inputs['Roughness'].default_value=.31
bsdf.inputs['Metallic'].default_value=.08
bsdf.inputs['Coat Weight'].default_value=.24
bsdf.inputs['Coat Roughness'].default_value=.22
tex=nodes.new('ShaderNodeTexImage')
tex.image=bpy.data.images.load(str(root/'assets'/'sumi-poster.webp'))
tex.image.pack()
coord=nodes.new('ShaderNodeTexCoord')
mapping=nodes.new('ShaderNodeMapping')
links.new(coord.outputs['UV'],mapping.inputs['Vector'])
links.new(mapping.outputs['Vector'],tex.inputs['Vector'])
links.new(tex.outputs['Color'],bsdf.inputs['Base Color'])
bump=nodes.new('ShaderNodeBump')
bump.inputs['Strength'].default_value=.33
bump.inputs['Distance'].default_value=.065
links.new(tex.outputs['Color'],bump.inputs['Height'])
links.new(bump.outputs['Normal'],bsdf.inputs['Normal'])
for frame,shift,angle in [(1,0,0),(31,.06,.04),(61,.13,0),(91,.06,-.04),(121,0,0)]:
    mapping.inputs['Location'].default_value=(shift,.035*math.sin((frame-1)*math.tau/120),0)
    mapping.inputs['Rotation'].default_value=(0,0,angle)
    mapping.inputs['Location'].keyframe_insert(data_path='default_value',frame=frame)
    mapping.inputs['Rotation'].keyframe_insert(data_path='default_value',frame=frame)
surface.data.materials.append(material)

bpy.ops.object.camera_add(location=(0,0,6))
camera=bpy.context.object
camera.name='Camera macro vertical'
camera.data.type='ORTHO'
camera.data.ortho_scale=4.5
scene.camera=camera
for name,location,power,color,size in [('Luz rasante',(-1.8,1.5,3),380,(1,.87,.72),3),('Recorte carmim',(2,-1,2),160,(1,.19,.17),2.5)]:
    bpy.ops.object.light_add(type='AREA',location=location)
    light=bpy.context.object
    light.name=name
    light.data.energy=power
    light.data.color=color
    light.data.shape='DISK'
    light.data.size=size
scene.view_settings.view_transform='AgX'
scene.frame_set(1)
bpy.ops.wm.save_as_mainfile(filepath=str(out/'itala-materia-carmim.blend'))
for frame,name in [(1,'ink-relief-start.png'),(61,'ink-relief-middle.png')]:
    scene.frame_set(frame)
    scene.render.filepath=str(out/name)
    bpy.ops.render.render(write_still=True)
print('ITALA_BLENDER_RENDER_COMPLETE')
