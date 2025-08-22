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
      <div className="PageHeader">
        <div className="d-flex align-items-center justify-content-between mb-2 mb-sm-0">
          <div className="d-flex align-items-center">
            {backButton && (
              <div
                onClick={handleBackClick}
                className="PageHeader-back"
                style={{ 
                  cursor: 'pointer',
                  padding: '8px 12px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '6px',
                  marginRight: '12px',
                  fontSize: '16px',
                  fontWeight: '500',
                  color: '#666',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span style={{ fontSize: '20px' }}>←</span>
                <span>Back</span>
              </div>
            )}

            <div className="PageHeader-Box">
              <div className="PageHeader-text1">{title}</div>
              <div>Dashboard / {title}</div>
            </div>
          </div>

          {children && (
            <div className="PageHeader-actions">
              {children}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PageHeader;
