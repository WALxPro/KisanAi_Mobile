import { Text, View, Image } from "react-native";
import { DropletIcon } from "../../../assets/Icon/DropletIcon";
import { WindIcon } from "../../../assets/Icon/WindIcon";
import { ThermometerIcon } from "../../../assets/Icon/ThermometerIcon";

const WeatherCard = ({ weather }) => (
  <View
    className="bg-card relative rounded-2xl p-5 my-4 shadow-sm flex-row items-center"
    style={{ elevation: 2 }}
  >
    <View className="flex-1">
      <Text className="text-xl mb-2 font-interBold text-foreground/70">
        {weather.location.name}, {weather.location.region}
      </Text>
      <Text className="text-4xl font-interBold text-foreground mt-1">
        {weather.current.temp_c}°C
      </Text>
      <Text className="text-sm text-muted-foreground mt-0.5">
        {weather.current.condition.text}
      </Text>
      <View className="flex-row gap-1.5 justify-between mt-2">
        <View className="bg-secondary w-[33%] py-4 flex items-center justify-center rounded-xl">
          <WindIcon width={20} height={20} color="#14b8a6" />
          <Text className="text-xs text-muted-foreground my-1 text-center">
            Humidity
          </Text>
          <Text className="text-sm text-foreground text-center">
            {weather.current.humidity}%
          </Text>
        </View>
        <View className="bg-secondary w-[33%] py-4 flex items-center justify-center rounded-xl">
          <WindIcon width={20} height={20} color="#14b8a6" />
          <Text className="text-xs text-muted-foreground my-1 text-center">
            Wind
          </Text>
          <Text className="text-sm text-foreground text-center">
            {weather.current.wind_kph} kph
          </Text>
        </View>
        <View className="bg-secondary w-[33%] py-4 flex items-center justify-center rounded-xl">
          <ThermometerIcon width={20} height={20} color="#14b8a6" />
          <Text className="text-xs text-muted-foreground my-1 text-center">
            Feels like
          </Text>
          <Text className="text-sm text-foreground text-center">
             {weather.current.feelslike_c}°C
          </Text>
        </View>
      </View>
    </View>
    <Image
      source={{ uri: "https:" + weather.current.condition.icon }}
      className="w-16 h-16 absolute top-7 right-10"
      resizeMode="contain"
    />
  </View>
);

export default WeatherCard;


{/* Weather Widget */}

