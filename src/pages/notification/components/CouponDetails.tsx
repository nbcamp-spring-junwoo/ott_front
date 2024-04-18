import { Card, message } from 'antd';
import Meta from 'antd/es/card/Meta';
import axios from 'axios';
import React, { useState } from 'react';

import { postCouponIssuance } from '../../../core/apis/notificationApi.ts';
import { CouponReadResponseDto } from '../../../core/types/notification.ts';
import CouponDetailsContent from './Components/CouponDetailsContent.tsx';
import CouponDetailsTitle from './Components/CouponDetailsTitle.tsx';
import styles from './CouponDetails.module.css';
import { GetCouponLoadingModal } from './GetCouponLoadingModal.tsx';

type CouponDetailsProps = {
  coupon: CouponReadResponseDto;
};

export const CouponDetails: React.FC<CouponDetailsProps> = ({ coupon }) => {
  const { description, ...restProps } = coupon;
  const [isPostCouponLoading, setIsPostCouponLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCouponIssued, setIsCouponIssued] = useState(false);

  const handleCouponClick = async () => {
    if (isPostCouponLoading || isCouponIssued) return;
    setIsModalVisible(true);
    setIsPostCouponLoading(true);

    try {
      await postCouponIssuance(coupon.couponId);
      setIsCouponIssued(true);
    } catch (error) {
      setIsCouponIssued(false);
      if (axios.isAxiosError(error)) {
        message.error(error.message);
      }
      console.error(error);
    } finally {
      setIsPostCouponLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Card
        hoverable
        onClick={handleCouponClick}
        style={{ alignSelf: 'center', aspectRatio: '16/9', backgroundColor: '#48D1CC', maxWidth: '480px' }}
        type="inner"
      >
        <Meta
          className={styles.bgColor}
          description={<CouponDetailsContent {...restProps} style={{ height: '100%' }} />}
          style={{ display: 'flex', flexDirection: 'column' }}
          title={<CouponDetailsTitle title={description} />}
        />
      </Card>

      <GetCouponLoadingModal
        isCouponIssued={isCouponIssued}
        isPostCouponLoading={isPostCouponLoading}
        onCancel={handleModalClose}
        open={isModalVisible}
      />
    </>
  );
};
