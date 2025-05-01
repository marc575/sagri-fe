import React from 'react';
import Layout from '../components/dashboard/layout';
import Profile from '../components/dashboard/Profile';
import { useAuth } from '../context/AuthContext';
import Project from '../components/dashboard/Project';
import Product from '../components/dashboard/Product';

function me() {
  const { user } = useAuth();
  return (
    <Layout>
      <Profile user={user} />
      <Project userId={user?.id} />
      <Product userId={user?.id} />
    </Layout>
  )
}

export default me
