'use client';
import ToastProvider from './Context/ToastContext';
import ColourPicker from './components/ColourPicker';
import 'react-toastify/dist/ReactToastify.css';

export default function Page() {
  return (
    <ToastProvider>
      <ColourPicker />
    </ToastProvider>
  );
}
