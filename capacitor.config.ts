import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dailytask.challenge',
  appName: 'Daily Task Challenge',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;