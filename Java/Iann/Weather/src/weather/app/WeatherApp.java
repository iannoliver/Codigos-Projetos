package weather.app;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.json.*;

public class WeatherApp {
    
    public static void main(String[] args) {

    	   String apiKey = "98d0bb5675a8cf41315641e6a7ab9e57";
           String city = "Miami";
           String url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    	
    	   try {
               URL obj = new URL(url);
               HttpURLConnection con = (HttpURLConnection) obj.openConnection();
               con.setRequestMethod("GET");
               BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
               String inputLine;
               StringBuffer response = new StringBuffer();
               while ((inputLine = in.readLine()) != null) {
                   response.append(inputLine);
               }
               in.close();
               
               JSONObject json = new JSONObject(response.toString());
               double temperature = json.getJSONObject("main").getDouble("temp");
               double humidity = json.getJSONObject("main").getDouble("humidity");
               String description = json.getJSONArray("weather").getJSONObject(0).getString("description");
               
               System.out.println("Temperature: " + temperature);
               System.out.println("Humidity: " + humidity);
               System.out.println("Weather Description: " + description);
               
           } catch (Exception e) {
               System.out.println("Error: " + e.getMessage());
         }
    }  
}  

