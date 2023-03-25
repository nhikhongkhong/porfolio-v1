import clsx from 'clsx';
import React from 'react';
import {TypedSuperpowerProps} from './types';
import {useTypedSuperpower, TypePhase} from './useTypedSuperpower';

const TypedSuperpower = (props: TypedSuperpowerProps) => {
  const {content, textClassName} = props;
  const {typedSuperpower, selectedSuperpower, phase, resume} = useTypedSuperpower(content);
  return (
    <div
      className={clsx(textClassName, {
        ['text-white cursor-pointer']: true,
        ['end-cursor']: phase !== TypePhase.Deleting,
        ['blinking']: phase === TypePhase.Pausing,
      })}
      aria-label={selectedSuperpower}
      onClick={resume}
    >
      {typedSuperpower}
    </div>
  );
};

export default TypedSuperpower;
