import { Image, List, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { RankingReadResponse } from '../../../core/types/video';

interface RankingVideoListItemProps {
  rank: number;
  video: RankingReadResponse;
}

const RankingVideoListItem: React.FC<RankingVideoListItemProps> = ({ rank, video }) => {
  console.log(video);
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate(`/videos/${video.videoId}`);
  };

  return (
    <List.Item
      extra={<Image height={280} preview={false} src={video.poster_url} />}
      hoverable
      key={video.videoId}
      onClick={handleOnClick}
      style={{ cursor: 'pointer' }}
    >
      <List.Item.Meta
        avatar={<Typography.Title>{rank}.</Typography.Title>}
        description={
          <Typography.Paragraph style={{ textAlign: 'start' }}>
            {video.videoDescription}
          </Typography.Paragraph>
        }
        title={
          <Typography.Title style={{ textAlign: 'left' }}>{video.videoTitle}</Typography.Title>
        }
      />
    </List.Item>
  );
};

export default RankingVideoListItem;
