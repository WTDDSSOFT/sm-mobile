import React, { useState, useRef, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';

import { Wrapper, Container, Main } from './styles';
import api from '../../../service/api';

interface AttendanceProps {
  doctor_id: string;
  attendance_doctor_paitent: string;
  id: string;
  name_patiente: string;
}
const Attendance: React.FC = () => {
  const [attendance, setAttendance] = useState<AttendanceProps[]>([]);

  useEffect(() => {
    async function listItem() {
      await api.get('/attendance/').then(response => {
        setAttendance(response.data);
      });
    }
    listItem();
  }, []);

  return (
    <Wrapper>
      <Container>
        <Main>
          <FlatList
            data={attendance}
            keyExtractor={attendance => attendance.id}
            renderItem={({ item }) => (
              <>
                <View>
                  <Text style={{ color: '#ffffff' }}>{item.doctor_id}</Text>
                </View>
                <View>
                  <Text style={{ color: '#ffffff' }}>
                    {item.attendance_doctor_paitent}
                  </Text>
                </View>
                <View>
                  <Text style={{ color: '#ffffff' }}>{item.name_patiente}</Text>
                </View>
              </>
            )}
          />
        </Main>
      </Container>
    </Wrapper>
  );
};

export default Attendance;
