import React from 'react';
import { Button } from 'reactstrap';

import { Icon } from 'tapis-ui/_common';
import styles from './Toolbar.module.scss';

type ToolbarButtonProps = {
  text: string;
  icon: string;
  onClick: () => void;
  disabled: boolean;
};

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  text,
  icon,
  onClick,
  disabled = true,
}) => {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      className={styles.toolbar_btn}
    >
      <Icon name={icon}></Icon>
      <span>{text}</span>
    </Button>
  );
};

const Toolbar: React.FC = () => {
  return (
    <div className={styles.toolbar_wrapper}>
      <ToolbarButton
        text="Rename"
        icon="edit"
        disabled={false}
        onClick={() => {
          alert('Toolbar button');
        }}
      />
      <ToolbarButton
        text="Move"
        icon="move"
        disabled={true}
        onClick={() => {
          alert('Toolbar button');
        }}
      />
      <ToolbarButton
        text="Copy"
        icon="copy"
        disabled={true}
        onClick={() => {
          alert('Toolbar button');
        }}
      />
      <ToolbarButton
        text="Download"
        icon="download"
        disabled={true}
        onClick={() => {
          alert('Toolbar button');
        }}
      />
      <ToolbarButton
        text="Trash"
        icon="trash"
        disabled={true}
        onClick={() => {
          alert('Toolbar button');
        }}
      />
    </div>
  );
};

export default Toolbar;
