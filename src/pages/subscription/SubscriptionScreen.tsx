import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { getMemberships } from '../../core/apis/membershipApi.ts';
import SubscribeCard, { membershipType } from './components/SubscribeCard.tsx';

const SubscriptionScreen = () => {
  const [memberships, setMemberships] = useState<membershipType[]>();

  useEffect(() => {
    getMemberships().then((data) => {
      setMemberships(data);
    });
  }, []);

  return (
    <Row gutter={[16, 16]}>
      {memberships?.map((membership, index) => (
        <Col xs={24} xl={12} key={index.toString()}>
          <SubscribeCard subscriptionInfo={membership} />
        </Col>
      ))}
    </Row>
  );
};

export default SubscriptionScreen;