from app import db

class UserComm(db.Model):
    __tablename__ = 'user_comm'
    id = db.Column(db.Integer, primary_key=True)
    org_id = db.Column(db.String(36), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    user_name = db.Column(db.String(100), nullable=False)
    comm_time = db.Column(db.DateTime)
    wechat_id = db.Column(db.String(36))

    def __init__(self, org_id, score, user_name, wechat_id=None, comm_time=None):
        self.org_id = org_id
        self.score = score
        self.user_name = user_name
        self.wechat_id = wechat_id
        self.comm_time = comm_time

    def __repr__(self):
        return '<User %r>' % self.user_name

class Organization(db.Model):
    __tablename__ = 'basis_organization_base'
    OrganizationId = db.Column(db.String(36), primary_key=True,  unique=True)
    OrganizationName = db.Column(db.String(100), nullable=False)
    BriefName = db.Column(db.String(100))
    TypeFlag = db.Column(db.Integer, nullable=False)
    Remark = db.Column(db.String(1000))
    ActiveFlag = db.Column(db.Integer)
    longitude = db.Column(db.String(30))
    latitude = db.Column(db.String(30))
    businessHours = db.Column(db.String(30))
    Phone = db.Column(db.String(300))
    address = db.Column(db.String(200))

    def __init__(self, OrganizationId=None, OrganizationName=None,
                 BriefName=None,TypeFlag=None, Remark=None, ActiveFlag=None, longitude=None, latitude=None, businessHours=None, Phone=None, address=None):
        self.OrganizationId = OrganizationId
        self.OrganizationName = OrganizationName
        self.BriefName = BriefName
        self.TypeFlag = TypeFlag
        self.Remark = Remark
        self.ActiveFlag = ActiveFlag
        self.longitude = longitude
        self.latitude = latitude
        self.businessHours = businessHours
        self.Phone = Phone
        self.address = address

    def __repr__(self):
        return '<User %r>' % self.OrganizationName









