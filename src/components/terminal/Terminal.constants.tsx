import { uuid } from '../../utils';
import { Bot } from '../Bot';
import { Spacer } from '../Spacer';

export const MAX_INPUT_LENGTH = 20;

export const BOOT_UP_JSX = [
  <pre data-prefix='$' key={uuid()}>
    <code>npm i virtual-zach</code>
  </pre>,

  <pre data-prefix='>' className='text-warning' key={uuid()}>
    <code>installing...</code>
  </pre>,

  <pre data-prefix='>' className='text-success' key={uuid()}>
    <code>Done!</code>
  </pre>,

  <div
    className='w-full flex flex-col items-center text-primary-content text-center'
    key={uuid()}
  >
    <Bot />
    <Spacer height={16} />
  </div>,
  <div
    className='w-full flex flex-col items-center text-primary-content text-center'
    key={uuid()}
  >
    <code>Thank you for visiting!</code>
  </div>,
  <pre data-prefix=' ' key={uuid()}></pre>,

  <pre data-prefix='?' className='pb-4' key={uuid()}>
    Type <kbd className='kbd'>h</kbd> for help
  </pre>,
];
