// import { Button } from './Button';
import  Button  from '../components/Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Button',
  component: Button,
  // tags: ['autodocs'],
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
};

function action(clicked) {}

export const Text = () => <Button onClick={action('clicked')}>Hello Button</Button>

export const Save = () => <Button variant='save'>Save</Button>
export const Cancel = () =><Button variant='cancel'>Cancel</Button>


// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = () => <Button>Primary Button</Button>
// export const Primary = {
//   args: {
//     primary: true,
//     label: 'Primary Button',
//   },
// };

export const Secondary = {
  args: {
    label: 'Button',
  },
};

export const Large = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

export const Small = {
  args: {
    size: 'small',
    label: 'Button',
  },
};
