import { FC, useState, memo } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import ToolItem from '../toolItem';
import { IEditorContext } from '../types';

const Heading: FC<IEditorContext> = (context) => {
  const { t } = useTranslation('translation', { keyPrefix: 'editor' });
  const headerList = [
    {
      text: `<h4 class="mb-0">${t('heading.options.h4')}</h4>`,
      level: 4,
      label: t('heading.options.h4'),
    },
    {
      text: `<h5 class="mb-0">${t('heading.options.h5')}</h5>`,
      level: 5,
      label: t('heading.options.h5'),
    },
    {
      text: `<h6 class="mb-0">${t('heading.options.h6')}</h6>`,
      level: 6,
      label: t('heading.options.h6'),
    },
  ];
  const item = {
    label: 'heading',
    keyMap: ['Ctrl-H'],
    tip: `${t('heading.text')} (Ctrl+H)`,
  };
  const [isShow, setShowState] = useState(false);
  const [isLocked, setLockState] = useState(false);

  const handleClick = (level = 2, label = '大标题') => {
    const { replaceLines } = context;

    replaceLines((line) => {
      line = line.trim().replace(/^#*/, '').trim();
      line = `${'#'.repeat(level)} ${line || label}`;
      return line;
    }, level + 1);
    setShowState(false);
  };
  const onAddHeader = () => {
    if (isLocked) {
      return;
    }
    setShowState(!isShow);
  };

  const handleMouseEnter = () => {
    setLockState(true);
  };

  const handleMouseLeave = () => {
    setLockState(false);
  };
  return (
    <ToolItem
      as="dropdown"
      {...item}
      isShow={isShow}
      onClick={onAddHeader}
      onBlur={onAddHeader}>
      <Dropdown.Menu
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        {headerList.map((header) => {
          return (
            <Dropdown.Item
              key={header.text}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleClick(header.level, header.label);
              }}
              dangerouslySetInnerHTML={{ __html: header.text }}
            />
          );
        })}
      </Dropdown.Menu>
    </ToolItem>
  );
};

export default memo(Heading);
