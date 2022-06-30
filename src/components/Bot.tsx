import { FC } from 'react';

export const Bot: FC<{ color?: string; size?: number }> = (props) => {
  const { color = 'white', size = 150 } = props;
  return (
    <svg
      width={size}
      height={size * (787 / 790)}
      viewBox={`0 0 787 790`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='497' cy='384' r='60' fill={color} />
      <path d='M738 535H42V518H738V535Z' fill={color} />
      <path
        d='M18 517.5H96.5C96.5 193.9 246.333 120.667 330 130C311.833 89 313 18 393 18C473 18 474.5 89 454.5 130C676.5 130 699.833 392 694.5 517.5H769.5V772.5H18V517.5Z'
        stroke={color}
        strokeWidth='35'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M285 444C318.137 444 345 417.137 345 384C345 350.863 318.137 324 285 324C251.863 324 225 350.863 225 384C225 417.137 251.863 444 285 444ZM295.534 373.466L285 345L274.466 373.466L246 384L274.466 394.534L285 423L295.534 394.534L324 384L295.534 373.466Z'
        fill={color}
      />
    </svg>
  );
};
