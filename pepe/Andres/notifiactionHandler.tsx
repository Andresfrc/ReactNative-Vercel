import * as Notifications from 'expo-notifications';
import { SchedulableTriggerInputTypes } from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function scheduleTaskNotification(title: string, date: Date) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Recordatorio de tarea',
      body: title,
    },
    trigger: {
      type: SchedulableTriggerInputTypes.DATE,  // ✅ Valor específico del enum
      date: date,
    },
  });
}