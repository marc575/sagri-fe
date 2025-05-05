import React from 'react';
import Layout from '../components/dashboard/layout';
import Profile from '../components/dashboard/Profile';
import { useAuth } from '../context/AuthContext';
import Project from '../components/dashboard/Project';
import Product from '../components/dashboard/Product';
import Order from '../components/dashboard/Order';

export default function me() {
  const { user } = useAuth();
  return (
    <Layout>
      <Profile user={user} />
      {
        user?.status === 1 ? (
          <>
            <Order />
            <Product userId={user?.id} />
            <Project userId={user?.id} />
          </>
        ) : null
      }
    </Layout>
  )
}

