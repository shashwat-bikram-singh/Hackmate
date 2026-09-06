import React from 'react';
import ExpandableProfileCard from './original';

export default function ExpandableProfileCardDemo() {
  return (
    <div style={{ display: 'flex', width: '100%', maxWidth: '380px', alignItems: 'center', justifyContent: 'center', padding: '16px', margin: '0 auto' }}>
      <ExpandableProfileCard />
    </div>
  );
}
