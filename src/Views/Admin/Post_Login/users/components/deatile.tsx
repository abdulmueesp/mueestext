// @ts-nocheck
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Row, Col, Tag, Avatar, Statistic, Button, Divider, Skeleton } from "antd";
import { 
  FaUserGraduate, 
  FaChalkboardTeacher, 
  FaUsers, 
  FaBuilding, 
  FaArrowLeft,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaUserCheck,
  FaUserTimes,
  FaUserCircle
} from "react-icons/fa";
import PageHeader from "../../../../../Components/common/PageHeader";

interface UserDetail {
  id: number;
  username: string;
  type: string;
  email: string;
  phoneNumber: string;
  status: string;
  subscription: any;
  joinDate: string;
  lastLogin: string;
  institute?: {
    name: string;
    address: string;
    teachers: number;
    students: number;
    batches: number;
    established: string;
  };
}

const DeatileCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // Dummy data for user details with institute information
  const userDetailsData: UserDetail[] = [
    {
      id: 1,
      username: "John Smith",
      type: "Student",
      email: "john.smith@email.com",
      phoneNumber: "+91 98765 43210",
      status: "Active",
      subscription: {
        type: "Premium",
        rate: "249",
        papers: 150,
        validity: "1 Year",
        status: "Active",
        offerRate: "199",
        attempts: 15
      },
      joinDate: "2024-01-15",
      lastLogin: "2024-03-20",
      institute: {
        name: "Delhi Public School",
        address: "123, Connaught Place, New Delhi",
        teachers: 45,
        students: 1200,
        batches: 24,
        established: "1995"
      }
    },
    {
      id: 2,
      username: "Sarah Johnson",
      type: "Teacher",
      email: "sarah.johnson@email.com",
      phoneNumber: "+91 87654 32109",
      status: "Active",
      subscription: null, // No subscription
      joinDate: "2023-08-20",
      lastLogin: "2024-03-19",
      institute: {
        name: "St. Mary's Convent",
        address: "456, Civil Lines, Mumbai",
        teachers: 32,
        students: 850,
        batches: 18,
        established: "1980"
      }
    },
    {
      id: 3,
      username: "Mike Wilson",
      type: "Parent",
      email: "mike.wilson@email.com",
      phoneNumber: "+91 76543 21098",
      status: "Active",
      subscription: {
        type: "Basic",
        rate: "150",
        papers: 75,
        validity: "4 Months",
        status: "Active",
        offerRate: "120",
        attempts: 8
      },
      joinDate: "2024-02-10",
      lastLogin: "2024-03-18",
      institute: {
        name: "Modern Public School",
        address: "789, Sector 15, Gurgaon",
        teachers: 28,
        students: 650,
        batches: 15,
        established: "2005"
      }
    },
    {
      id: 4,
      username: "Emily Davis",
      type: "Student",
      email: "emily.davis@email.com",
      phoneNumber: "+91 65432 10987",
      status: "Inactive",
      subscription: null, // No subscription
      joinDate: "2023-12-05",
      lastLogin: "2024-02-15"
      // No institute data
    },
    {
      id: 5,
      username: "David Brown",
      type: "Teacher",
      email: "david.brown@email.com",
      phoneNumber: "+91 54321 09876",
      status: "Active",
      subscription: {
        type: "Pro",
        rate: "900",
        papers: 50,
        validity: "3 Months",
        status: "Active",
        offerRate: "750",
        attempts: 5
      },
      joinDate: "2023-06-12",
      lastLogin: "2024-03-20",
      institute: {
        name: "Kendriya Vidyalaya",
        address: "321, Defence Colony, Bangalore",
        teachers: 38,
        students: 950,
        batches: 22,
        established: "1990"
      }
    },
    {
      id: 6,
      username: "Lisa Anderson",
      type: "Student",
      email: "lisa.anderson@email.com",
      phoneNumber: "+91 43210 98765",
      status: "Active",
      subscription: null, // No subscription
      joinDate: "2024-03-01",
      lastLogin: "2024-03-20"
      // No institute data
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchUserDetail = () => {
      setTimeout(() => {
        const user = userDetailsData.find(u => u.id === Number(id));
        setUserDetail(user || null);
        setLoading(false);
      }, 500);
    };

    fetchUserDetail();
  }, [id]);

  const getUserTypeIcon = (type: string) => {
    switch (type) {
      case "Student":
        return <FaUserGraduate  size={20} />;
      case "Teacher":
        return <FaChalkboardTeacher  size={20} />;
      case "Parent":
        return <FaUsers  size={20} />;
      default:
        return <FaUserGraduate  size={20} />;
    }
  };

  const getUserTypeColor = (type: string) => {
    switch (type) {
      case "Student":
        return "blue";
      case "Teacher":
        return "green";
      case "Parent":
        return "purple";
      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <>
        <PageHeader 
          title="User Details" 
          backButton={true} 
          onBack={() => navigate('/users')}
        />

        <div className="mt-6 space-y-6">
          {/* Basic Information Skeleton */}
          <Card title="Basic Information" className="shadow-sm">
            <Row gutter={[24, 16]}>
              <Col xs={24} sm={12} lg={8}>
                <div className="flex items-center gap-4">
                  <Skeleton.Avatar active size={80} />
                  <div className="flex-1">
                    <Skeleton.Input active size="large" className="mb-2" />
                    <Skeleton.Input active size="small" className="mb-2" />
                    <Skeleton.Input active size="small" />
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={8}>
                <div className="space-y-3">
                  <Skeleton.Input active size="default" />
                  <Skeleton.Input active size="default" />
                </div>
              </Col>
              <Col xs={24} sm={24} lg={8}>
                <div className="space-y-3">
                  <Skeleton.Input active size="default" />
                </div>
              </Col>
            </Row>
          </Card>

          {/* Subscription Details Skeleton */}
          <Card title="Subscription Details" className="shadow-sm">
            <Row gutter={[24, 16]}>
              <Col xs={24} sm={12} lg={6}>
                <div className="text-center p-3 border rounded-lg">
                  <Skeleton.Input active size="large" className="mb-1" />
                  <Skeleton.Input active size="small" />
                </div>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <div className="text-center p-3 border rounded-lg">
                  <Skeleton.Input active size="large" className="mb-1" />
                  <Skeleton.Input active size="small" />
                </div>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <div className="text-center p-3 border rounded-lg">
                  <Skeleton.Input active size="large" className="mb-1" />
                  <Skeleton.Input active size="small" />
                </div>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <div className="text-center p-3 border rounded-lg">
                  <Skeleton.Input active size="large" className="mb-1" />
                  <Skeleton.Input active size="small" />
                </div>
              </Col>
              <Col xs={24} sm={12} lg={8}>
                <div className="text-center p-3 border rounded-lg">
                  <Skeleton.Input active size="large" className="mb-1" />
                  <Skeleton.Input active size="small" />
                </div>
              </Col>
              <Col xs={24} sm={12} lg={8}>
                <div className="text-center p-3 border rounded-lg">
                  <Skeleton.Input active size="large" className="mb-1" />
                  <Skeleton.Input active size="small" />
                </div>
              </Col>
            </Row>
          </Card>

          {/* Institute Information Skeleton */}
          <Card title="Institute Information" className="shadow-sm">
            <Row gutter={[24, 16]}>
              <Col xs={24} sm={12} lg={8}>
                <div className="text-center p-4 border rounded-lg">
                  <Skeleton.Avatar active size={48} className="mx-auto mb-2" />
                  <Skeleton.Input active size="default" className="mb-2" />
                  <Skeleton.Input active size="small" className="mb-1" />
                  <Skeleton.Input active size="small" />
                </div>
              </Col>
              <Col xs={24} sm={12} lg={16}>
                <Row gutter={[16, 16]}>
                  <Col xs={12} sm={8}>
                    <div className="text-center p-3 border rounded-lg">
                      <Skeleton.Avatar active size={32} className="mx-auto mb-2" />
                      <Skeleton.Input active size="default" className="mb-1" />
                      <Skeleton.Input active size="small" />
                    </div>
                  </Col>
                  <Col xs={12} sm={8}>
                    <div className="text-center p-3 border rounded-lg">
                      <Skeleton.Avatar active size={32} className="mx-auto mb-2" />
                      <Skeleton.Input active size="default" className="mb-1" />
                      <Skeleton.Input active size="small" />
                    </div>
                  </Col>
                  <Col xs={24} sm={8}>
                    <div className="text-center p-3 border rounded-lg">
                      <Skeleton.Avatar active size={32} className="mx-auto mb-2" />
                      <Skeleton.Input active size="default" className="mb-1" />
                      <Skeleton.Input active size="small" />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </div>
      </>
    );
  }

  if (!userDetail) {
    return (
      <div className="text-center py-8">
        <div className="text-lg text-black">User not found</div>
        <Button onClick={() => navigate('/users')} className="mt-4">
          Back to Users
        </Button>
      </div>
    );
  }

  return (
    <>
      <PageHeader 
        title="User Details" 
        backButton={true} 
        onBack={() => navigate('/users')}
      />

      <div className="mt-6 space-y-6">
        {/* User Basic Information */}
        <Card title="Basic Information" className="shadow-sm">
          <Row gutter={[24, 16]}>
            <Col xs={24} sm={12} lg={8}>
              <div className="flex items-center gap-4">
              <FaUserCircle size={80} color="gray" />
                <div>
                  <h2 className="font-local2 text-2xl font-semibold text-black mb-2">
                    {userDetail.username}
                  </h2>
                  <div className="flex items-center gap-2 mb-2">
                    {getUserTypeIcon(userDetail.type)}
                    <Tag color={getUserTypeColor(userDetail.type)} className="font-local2 text-base">
                      {userDetail.type}
                    </Tag>
                  </div>
                  <Tag 
                    color={userDetail.status === "Active" ? "green" : "red"} 
                    className="font-local2"
                  >
                    {userDetail.status}
                  </Tag>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-black" />
                  <span className="font-local2 text-black">{userDetail.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaPhone className="text-black" />
                  <span className="font-local2 text-black">{userDetail.phoneNumber}</span>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} lg={8}>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-black" />
                  <span className="font-local2 text-black">Joined: {userDetail.joinDate}</span>
                </div>
              
              </div>
            </Col>
          </Row>
        </Card>

        {/* Subscription Information - Only show if subscription exists */}
        {userDetail.subscription && (
          <Card title="Subscription Details" className="shadow-sm">
            <Row gutter={[24, 16]}>
              <Col xs={24} sm={12} lg={6}>
                <div className="text-center p-3 border rounded-lg">
                  <div className="font-local2 text-lg font-semibold text-black mb-1">
                    {userDetail.subscription.type}
                  </div>
                  <div className="text-sm text-black">Plan Type</div>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <div className="text-center p-3 border rounded-lg">
                  <div className="font-local2 text-lg font-semibold text-black mb-1">
                    ₹{userDetail.subscription.rate}
                  </div>
                  <div className="text-sm text-black">Rate</div>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <div className="text-center p-3 border rounded-lg">
                  <div className="font-local2 text-lg font-semibold text-black mb-1">
                    {userDetail.subscription.papers}
                  </div>
                  <div className="text-sm text-black">Papers</div>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <div className="text-center p-3 border rounded-lg">
                  <div className="font-local2 text-lg font-semibold text-black mb-1">
                    {userDetail.subscription.attempts}
                  </div>
                  <div className="text-sm text-black">Test Attempts</div>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={8}>
                <div className="text-center p-3 border rounded-lg">
                  <div className="font-local2 text-lg font-semibold text-black mb-1">
                    {userDetail.subscription.validity}
                  </div>
                  <div className="text-sm text-black">Validity</div>
                </div>
              </Col>
             
             
            </Row>
          </Card>
        )}

        {/* Institute Information - Only show if institute exists */}
        {userDetail.institute && (
          <Card title="Institute Information" className="shadow-sm">
            <Row gutter={[24, 16]}>
              <Col xs={24} sm={12} lg={8}>
                <div className="text-center p-4 border rounded-lg">
                  <FaBuilding className="text-3xl text-black mx-auto mb-2" />
                  <h3 className="font-local2 text-lg font-semibold text-black mb-2">
                    {userDetail.institute.name}
                  </h3>
                  <p className="text-black text-sm">{userDetail.institute.address}</p>
                  <p className="text-black text-xs mt-1">
                    Established: {userDetail.institute.established}
                  </p>
                </div>
              </Col>
              <Col xs={24} sm={12} lg={16}>
                <Row gutter={[16, 16]}>
                  <Col xs={12} sm={8}>
                    <div className="text-center p-3 border rounded-lg">
                      <FaChalkboardTeacher className="text-2xl text-black mx-auto mb-2" />
                      <div className="font-local2 text-lg font-semibold text-black mb-1">
                        {userDetail.institute.teachers}
                      </div>
                      <div className="text-sm text-black">Teachers</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={8}>
                    <div className="text-center p-3 border rounded-lg">
                      <FaUserGraduate className="text-2xl  mx-auto mb-2" />
                      <div className="font-local2 text-lg font-semibold text-black mb-1">
                        {userDetail.institute.students}
                      </div>
                      <div className="text-sm text-black">Students</div>
                    </div>
                  </Col>
                  <Col xs={24} sm={8}>
                    <div className="text-center p-3 border rounded-lg">
                      <FaUsers className="text-2xl text-black mx-auto mb-2" />
                      <div className="font-local2 text-lg font-semibold text-black mb-1">
                        {userDetail.institute.batches}
                      </div>
                      <div className="text-sm text-black">Batches</div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        )}
      </div>
    </>
  );
};

export default DeatileCard;