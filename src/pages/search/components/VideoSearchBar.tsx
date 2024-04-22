import { Space } from 'antd';
import React, { useState } from 'react';

import { VideoSearchResultDto } from '../../../core/types/video.ts';
import { useVideoSearchBar } from '../../../hooks/video/useVideoSearchBar.ts';
import { SearchInput } from './components/SearchInput.tsx';
import { SelectSearchType } from './components/SelectSearchType.tsx';

interface VideoSearchBarProps {
  setSearchResults: (value: VideoSearchResultDto[]) => void;
  stateLoading: {
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
  };
  stateValidInput: {
    isValidInput: boolean;
    setIsValidInput: (value: boolean) => void;
  };
}

const VideoSearchBar: React.FC<VideoSearchBarProps> = ({
  setSearchResults,
  stateLoading: { isLoading, setIsLoading },
  stateValidInput: { isValidInput, setIsValidInput },
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSearchType, setSelectedSearchType] = useState('제목');
  const searchAutoComplete = useVideoSearchBar(searchTerm);

  return (
    <Space.Compact style={{ alignItems: 'center' }}>
      <SelectSearchType setSelectedSearchOption={setSelectedSearchType} />

      <SearchInput
        searchAutoComplete={searchAutoComplete}
        selectedSearchType={selectedSearchType}
        setSearchResults={setSearchResults}
        setSearchTerm={setSearchTerm}
        stateLoading={{ isLoading, setIsLoading }}
        stateValidInput={{ isValidInput, setIsValidInput }}
      />
    </Space.Compact>
  );
};

export default VideoSearchBar;
