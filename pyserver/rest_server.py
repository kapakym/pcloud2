from quart import Quart, jsonify, request
import find_face
import cluster_creator
app = Quart(__name__)

@app.route('/find_faces', methods=['POST'])
async def find_faces():
    requestClient = await request.json
    path = requestClient['path']
    dest_path = requestClient['dest_path']
    # print(requestClient, path, dest_path)
    result = await find_face.findFaces(dest_path=dest_path, image_path=path)
    print(result)
    return jsonify(result), 200

@app.route('/update_clusters', methods=['POST'])
async def find_faces():
    requestClient = await request.json
    path = requestClient['path']
    result = await cluster_creator.create_clusters(images_path=path)
    print(result)
    return jsonify(result), 200


app.run(host='0.0.0.0', port=6000, debug=True)