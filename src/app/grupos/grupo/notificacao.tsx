import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import { List, Trash } from "phosphor-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Notification {
  id: number;
  title: string;
  description: string;
  isRead: boolean;
  date: string;
}

export default function Notificacao() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const getTodayDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const initialNotifications: Notification[] = [
      {
        id: 1,
        title: "Um novo comunicado em DEPAE",
        description: "Reenvio de documentos para auxílio reabertura de prazos",
        isRead: false,
        date: getTodayDate(),
      },
      {
        id: 2,
        title: "Um novo comunicado em PAAE",
        description: "Calendário de Pagamento da Próxima Parcela do Auxílio",
        isRead: false,
        date: "2025-02-16",
      },
      {
        id: 3,
        title: "Um novo comunicado em DA",
        description:
          "Atualização Cadastral Obrigatória para Manutenção do Auxílio",
        isRead: false,
        date: "2023-11-15",
      },
      {
        id: 4,
        title: "Um novo comunicado em DP",
        description:
          "Notificação de Problemas com a Rede Wi-Fi da instituição.",
        isRead: false,
        date: "2023-11-15",
      },
      {
        id: 5,
        title: "Um novo comunicado em COGEP",
        description:
          "Substituição de Equipamentos nos Laboratórios de Informática",
        isRead: false,
        date: "2023-11-14",
      },
    ];

    setNotifications(initialNotifications);
  }, []);

  const handleNotificationPress = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  const deleteAllNotifications = () => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja apagar todas as notificações?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Apagar",
          onPress: () => setNotifications([]),
          style: "destructive",
        },
      ]
    );
  };

  const todayNotifications = notifications.filter(
    (notification) => notification.date === getTodayDate()
  );
  const pastNotifications = notifications.filter(
    (notification) => notification.date !== getTodayDate()
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <List size={28} color="#01A1C5" style={styles.menuIcon} />
        <Text style={styles.headerTitle}>Notificações</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.markAllButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={markAllAsRead}
        >
          <Text style={styles.buttonText}>Marcar Todas como Lidas</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.deleteAllButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={deleteAllNotifications}
        >
          <Trash size={24} color="#01A1C5" />
        </Pressable>
      </View>

      <ScrollView style={styles.notificationsList}>
        {todayNotifications.length > 0 && (
          <>
            <Text style={styles.dateHeader}>Hoje</Text>
            {todayNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onPress={() => handleNotificationPress(notification.id)}
              />
            ))}
          </>
        )}

        {pastNotifications.length > 0 && (
          <>
            <Text style={styles.dateHeader}>Anteriores</Text>
            {pastNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onPress={() => handleNotificationPress(notification.id)}
              />
            ))}
          </>
        )}

        {notifications.length === 0 && (
          <Text style={styles.noNotificationsText}>Nenhuma notificação.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const NotificationItem: React.FC<{
  notification: Notification;
  onPress: () => void;
}> = ({ notification, onPress }) => (
  <TouchableOpacity style={styles.notificationItem} onPress={onPress}>
    <View style={styles.notificationIconContainer}>
      <View style={styles.notificationIcon} />
      {!notification.isRead && <View style={styles.indicatorDot} />}
    </View>
    <View style={styles.notificationText}>
      <Text style={styles.notificationTitle}>{notification.title}</Text>
      <Text style={styles.notificationDescription}>
        {notification.description}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuIcon: {
    marginRight: 8,
  },
  headerTitle: {
    fontFamily: "MontserratSemiBold",
    fontSize: 24,
    color: "#01A1C5",
  },
  notificationsList: {
    padding: 16,
  },
  dateHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 8,
  },
  notificationItem: {
    flexDirection: "row",
    marginBottom: 16,
  },
  notificationIconContainer: {
    position: "relative",
    width: 40,
    height: 40,
    marginRight: 12,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
  },
  indicatorDot: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#01A1C5",
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  notificationDescription: {
    fontSize: 12,
    color: "#666",
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  markAllButton: {
    marginTop: 10,
  },
  deleteAllButton: {
    marginTop: 10,
  },
  buttonText: {
    color: "#01A1C5",
    fontSize: 14,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  noNotificationsText: {
    textAlign: "center",
    color: "#999",
    marginTop: 20,
  },
});