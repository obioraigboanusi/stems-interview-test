import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './select';
import Input from './shared/input';
import React from 'react';
import { mergeRefs } from 'react-merge-refs';
import PhoneNumberInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

type Props = {
  name?: string;
  value?: string;
  onChange: (value?: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  options: { value?: string; label?: string }[];
  iconComponent: React.ElementType;
  disabled?: boolean;
  readOnly?: boolean;
  tabIndex?: number | string;
  className?: string;
};

const PhoneNumberSelect = (props: Props) => {
  return (
    <Select
      value={props.value}
      onValueChange={(value) => props.onChange(value)}
      onOpenChange={(open) => (open ? props.onFocus() : props.onBlur())}
    >
      <SelectTrigger className='' aria-label='Countries'>
        <props.iconComponent
          aria-hidden
          country={props.value}
          label={props.value}
          className='h-20'
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {props.options.map((f, i) => (
            <SelectItem
              key={`${f.value ?? 'value'}-${i}`}
              value={f.value ?? ''}
            >
              {f.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

// eslint-disable-next-line react/display-name
const CustomInput = React.forwardRef((props: any, ref) => {
  return (
    <Input
      name={props.name}
      ref={ref}
      {...props}
      // className='ml-2 block my-0 py-1 px-2 w-full h-full rounded-tr-md rounded-br-md text-sm bg-transparent  border-1 border-gray-700 appearance-none focus:outline-none focus:ring-0 focus:border-vibrant bg-dark1 text-white'
    />
  );
});

const PhoneInput = ({
  inputComponent,
  countrySelectComponent,
  ...props
}: React.ComponentProps<typeof PhoneNumberInput>) => {
  const localRef = React.useRef<HTMLInputElement>();

  return (
    <PhoneNumberInput
      inputComponent={CustomInput}
      countrySelectComponent={PhoneNumberSelect}
      defaultCountry='US'
      international
      {...props}
    />
  );
};

export default PhoneInput;
