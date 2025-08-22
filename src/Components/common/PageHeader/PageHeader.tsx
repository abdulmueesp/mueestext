import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  backButton?: boolean;
  goBack?: string | number;
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, backButton = false, goBack = -1, children }) => {
  const navigation = useNavigate();

  const handleBackClick = () => {
    if (typeof goBack === 'number') {
      navigation(goBack);
    } else {
      navigation(goBack);
    }
  };

  return (
    <>
      <div className="w-full h-[50px] flex items-center border-b border-gray-200">
        <div className="flex gap-4">
          {backButton && (
            <div
              onClick={handleBackClick}
              className='h-min w-min p-2 border-2'
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clip-rule="evenodd" />
              </svg>


            </div>
          )}
            <div>
            <div className='font-semibold font-local2'>{title}</div>
            <div className='text-[13px] font-local2'>Dashboard / {title}</div>
            </div>
          


        </div>

      </div>
    </>
  );
};

export default PageHeader;
