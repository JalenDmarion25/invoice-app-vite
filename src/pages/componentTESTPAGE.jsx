import React from 'react';
import Calender from '../components/calender';
import DropdownNetDays from '../components/dropdownModal';
import AddItemList from '../components/addItemList';

const ComponentTestPage = () => {
  return (
    <div 
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <h1>TEST BED</h1>
      {/* <Calender/>
      <DropdownNetDays/> */}
      <AddItemList/>
    </div>
  );
}

export default ComponentTestPage;
