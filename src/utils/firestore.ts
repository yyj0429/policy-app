import firestore from '@react-native-firebase/firestore';

export interface WelfareService {
  service_id: string;
  service_name: string;
  service_url: string;
  service_summary: string;
  site: string;
  contact: string;
  ministry_name: string;
  organization_name: string;
  reference_year: number;
  last_modified_date: string;
}

export const getWelfareServices = async (): Promise<WelfareService[]> => {
  try {
    const snapshot = await firestore().collection('welfareServices').get();
    const services: WelfareService[] = snapshot.docs.map(
      doc =>
        ({
          service_id: doc.id,
          ...doc.data(),
        } as WelfareService),
    );

    return services;
  } catch (error) {
    console.error('Error fetching welfare services:', error);
    throw error;
  }
};
