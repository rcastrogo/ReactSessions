import './App.scss';
import { Routes, Route } from 'react-router';
import { Suspense, lazy } from 'react';
import { t } from 'i18next';

import Layout from './pages/Layout.tsx';
import { FullScreenLoader } from './components/Loading.tsx';

const Home = lazy(() => import('./pages/Home.tsx'));
const About = lazy(() => import('./pages/About.tsx'));
const Countries = lazy(() => import('./pages/Countries.tsx'));
const Config = lazy(() => import('./pages/Config.tsx'));
const Contact = lazy(() => import('./pages/Contact.tsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.tsx'));

export default function App() {
  return (
    <Suspense
      fallback={
        <FullScreenLoader message={t('home.title')} />
      }
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="config" element={<Config />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        <Route path="/countries" element={<Countries />} />
      </Routes>
    </Suspense>
  );
}