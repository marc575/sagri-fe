import React from 'react';
import Layout from '../components/dashboard/layout';
import Profile from '../components/dashboard/Profile';
import { useAuth } from '../context/AuthContext';

function me() {
  const { user } = useAuth();
  return (
    <Layout>
      <Profile user={user} />
    </Layout>
  )
}

export default me
