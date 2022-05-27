import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function FilterByCategory() {
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120, bgcolor:'#3d3d3d', borderRadius:"6px"}}>
        <Select native defaultValue="" id="grouped-native-select">
          <option aria-label="None" value=""/>
          <optgroup label="Notebooks">
            <option value={1}>Gamming</option>
            <option value={2}>Office </option>
						<option value={3}>Basic</option>
            </optgroup>
          <optgroup label="Peripherals">
            <option value={4}>Keyboards</option>
            <option value={5}>Mouses</option>
						<option value={6}>Headphones</option>
						<option value={7}>Speakers</option>
						<option value={8}>Joysticks</option>
						<option value={9}>Webcams</option>
						<option value={10}>Microphones</option>
          </optgroup>
        </Select>
      </FormControl>
    </div>
  );
}
