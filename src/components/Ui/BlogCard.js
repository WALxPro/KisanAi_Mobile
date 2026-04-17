import { Image, Text, TouchableOpacity, View } from "react-native";

const BlogCard = ({ item, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-card rounded-2xl overflow-hidden shadow-sm mb-4"
    style={{ elevation: 2 }}
  >
    <Image
      source={{ uri: item.image }}
      className="w-full h-36"
      resizeMode="cover"
    />
    <View className="p-4">
      <View className="self-start bg-secondary rounded-full px-3 py-1 mb-2">
        <Text className="text-xs font-interMedium text-primary">
          Author: {item.author}
        </Text>
      </View>
      <Text
        className="text-base font-interBold text-foreground mb-1"
        numberOfLines={2}
      >
        {item.title}
      </Text>
      <Text
        className="text-sm font-inter text-muted-foreground mb-3"
        numberOfLines={2}
      >
        {item.description}
      </Text>
      <View className="flex-row items-center justify-between">
        <Text className="text-xs text-muted-foreground">{item.created_at}</Text>
        <View className="bg-secondary rounded-full px-2 py-1">
          <Text className="text-xs font-interMedium text-primary">
            {item.category}
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

export default BlogCard