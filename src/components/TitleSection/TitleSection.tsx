import React, { FC, ReactNode } from 'react';

interface TitleSectionProps {
  title: string;
  children?: ReactNode;
  className?: string;
}

const TitleSection: FC<TitleSectionProps> = ({ title, className, children }) => {
  return (
    <div
      className={`flex min-h-[53px] flex-row items-center justify-between gap-4 rounded-tl-[7px] rounded-tr-[7px] border bg-[#F7F7F7] px-6 max-md:flex-wrap max-sm:py-4 ${className}`}>
      <span className="text-base font-semibold">{title}</span>
      {children && <>{children}</>}
    </div>
  );
};

export default TitleSection;
