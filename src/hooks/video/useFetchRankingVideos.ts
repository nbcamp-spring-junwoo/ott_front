import { message } from 'antd';
import { useCallback, useEffect, useState } from 'react';

import { getVideoRanking } from '../../core/apis/videoApi.ts';
import { ChartResponseDto } from '../../core/types/video.ts';

const useFetchRankingVideos = () => {
  const [videos, setVideos] = useState<ChartResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchVideos = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getVideoRanking();
      const responseVideos: ChartResponseDto[] = response.data.data;
      setVideos(responseVideos);
    } catch (error) {
      message.open({
        content: '비디오 목록을 불러오는 중 문제가 발생했습니다.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos().then();
  }, [fetchVideos]);

  return { isLoading, videos };
};

export default useFetchRankingVideos;
