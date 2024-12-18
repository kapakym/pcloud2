from quart import Quart, jsonify, request
import find_face
import cluster_creator
import ocr
app = Quart(__name__)

@app.route('/find_faces', methods=['POST'])
async def find_faces():
    requestClient = await request.json
    path = requestClient['path']
    dest_path = requestClient['dest_path']
    result = await find_face.findFaces(dest_path=dest_path, image_path=path)
    return jsonify(result), 200

@app.route('/update_clusters', methods=['POST'])
async def update_clusters():
    requestClient = await request.json
    path = requestClient['path']
    result = await cluster_creator.create_clusters(images_path=path)
    return jsonify(result), 200

@app.route('/get_text', methods=['POST'])
async def get_text():
    requestClient = await request.json
    path = requestClient['path']
    print(path)
    result = await ocr.recog_text(images_path=path)
    return jsonify(result), 200


app.run(host='0.0.0.0', port=6000, debug=True)