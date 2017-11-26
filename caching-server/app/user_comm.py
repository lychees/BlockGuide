from flask import  request, Flask,jsonify
from app import db, app
import time
from app.models.models import UserComm, Organization
import logging
from app.utils.JSONUtils import MyJSONDecoder,MyJSONEncoder

@app.route('/user-comm/list', methods=['GET'])
def get_user_comms():
    userComms = UserComm.query.all()
    return jsonify({'user_comms':transform_user_comm_list(userComms)}),200

@app.route('/user-comm/<user_comm_id>', methods=['GET'])
def get_user_comm_by_id(user_comm_id):

    userComm = UserComm.query.get(user_comm_id)
    userComm = transform_user_comm(userComm)
    return jsonify({'user_comm': userComm}),200

@app.route('/user-comm', methods=['POST'])
def insert_user_comm():
    resMap = {}
    resMap['errMsg'] = ''
    if not request.json or not 'org_id' in request.json or not 'score' in request.json:
        return jsonify({'result': False}), 404
    comm_time = time.strftime("%Y-%m-%D %H:%M:%S")
    userComm = UserComm(org_id= request.json['org_id'],
                        user_name=request.json['user_name'],
                        score = request.json['score'],
                        wechat_id=request.json['wechat_id'],
                        comm_time=comm_time)
    db.session.add(userComm)
    db.session.commit()
    return jsonify({'user_comm': transform_user_comm(userComm)}), 200

@app.route('/user-comm/<user_comm_id>', methods=['PUT'])
def update_user_comm(user_comm_id):
    if not request.json or not 'org_id' in request.json or not 'score' in request.json:
        return jsonify({'result': False}), 404
    else:
        userComm = UserComm.query.get(user_comm_id)
        userComm.org_id = request.json['org_id']
        userComm.score = request.json['score']
        db.session.commit()

    return jsonify({'user_comm': transform_user_comm(userComm)}), 200

@app.route('/user-comm/<user_comm_id>', methods=['DELETE'])
def delete_user_comm(user_comm_id):
    userComm = UserComm.query.get(user_comm_id)
    db.session.delete(userComm)
    db.session.commit()
    return jsonify({ 'result': True}), 200

@app.route('/user-comm/count', methods=['GET'])
def count_user_comm():
    count = UserComm.query.all().count()
    return jsonify({'count': count}), 200

@app.route('/user-comm/filter/<org_id>', methods=['GET'])
def query_user_comm_by_org_id(org_id):
    userComms = UserComm.query.filter_by(org_id=org_id).all()
    return jsonify({'user_comms': transform_user_comm_list(userComms)}), 200

@app.route('/org/list', methods=['GET'])
def get_orgs():
    orgs = Organization.query.all()
    return jsonify({'orgs': transform_org_list(orgs)}), 200

@app.route('/org/<id>', methods=['GET'])
def get_org_by_id(id):
    org = Organization.query.get(id)
    print(org.__dict__)
    return jsonify({'org': transform_org(org)}), 200

@app.route('/org', methods=['POST'])
def insert_org():
    if not request.json or not 'OrganizationId' in request.json['OrganizationId'] or not 'OrganizationName' in request.json['OrganizationName'] or not 'TypeFlag' in request.json['TypeFlag'] or not 'ActiveFlag' in request.json['ActiveFlag']:
        return jsonify({'result': False}), 200
    org = Organization(OrganizationId = request.json['OrganizationId'],
                       OrganizationName = request.json['OrganizationName'],
                       BriefName = request.json['BriefName'],
                       TypeFlag = request.json['TypeFlag'],
                       Remark = request.json['Remark'],
                       ActiveFlag = request.json['ActiveFlag'],
                       longitude = request.json['longitude'],
                       latitude = request.json['latitude'],
                       businessHours=request.json['businessHours'],
                       Phone=request.json['Phone'],
                       address=request.json['address'])
    db.session.add(org)
    db.session.commit()
    return jsonify({'org': transform_org(org)}), 200

@app.route('/org/<OrganizationId>', methods=['PUT'])
def update_org(OrganizationId):

    return jsonify({'result': True}), 200

@app.route('/org/<OrganizationId>', methods=['DELETE'])
def delete_org(OrganizationId):
    org = Organization.query.get(OrganizationId)
    db.session.delete(org)
    db.session.commit()
    return jsonify({'result':True}), 200

@app.route('/org/count', methods=['GET'])
def count_orgs():
    counts = Organization.query.all().count()
    return jsonify({'counts': counts}), 200


def transform_user_comm(userComm):
    user_comm = {}
    user_comm['id'] = userComm.id
    user_comm['org_id'] = userComm.org_id
    user_comm['score'] = userComm.score
    user_comm['user_name'] = userComm.user_name
    user_comm['comm_time'] = userComm.comm_time
    user_comm['wechat_id'] = userComm.wechat_id
    return user_comm

def transform_user_comm_list(userComms):
    result = []
    for userComm in userComms:
        user_comm_tmp = transform_user_comm(userComm)
        result.append(user_comm_tmp)
    return result

def transform_org_list(orgs):
    result = []
    for org in orgs:
        result.append(transform_org(org))
    print(result)
    return result

def transform_org(org):
    # org_tmp = {}
    # org_tmp['OrganizationId'] = org.OrganizationId
    # org_tmp['OrganizationName'] = org.OrganizationName
    # org_tmp['BriefName'] = org.BriefName
    # org_tmp['TypeFlag'] = org.TypeFlag
    # org_tmp['Remark'] = org.Remark
    # org_tmp['ActiveFlag'] = org.ActiveFlag
    # org_tmp['longitude'] = org.longitude
    # org_tmp['latitude'] = org.latitude
    # org_tmp['businessHours'] = org.businessHours
    # org_tmp['Phone'] = org.Phone
    # org_tmp['address'] = org.address
    return {
        'OrganizationId': org.OrganizationId,
        'OrganizationName': org.OrganizationName,
        'BriefName': org.BriefName,
        'TypeFlag': org.TypeFlag,
        'Remark': org.Remark,
        'ActiveFlag': org.ActiveFlag,
        'longitude': org.longitude,
        'latitude': org.latitude,
        'businessHours': org.businessHours,
        'Phone': org.Phone,
        'address': org.address
    }


if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    app.run(host='127.0.0.1', port=5000, debug=True)


