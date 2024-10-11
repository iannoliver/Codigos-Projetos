package weather.app;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.json.JSONObject;

public class Weather2 {

	public String[] dados() {
		String apiKey = "98d0bb5675a8cf41315641e6a7ab9e57";
        String city = "Miami";
        String url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
 	
        String[] valores = new String[3];
        
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
            
            valores[0]="Temperature: " + temperature;
            valores[1] = "Humidity: " + humidity;
            valores[2]= "Weather Description: " + description;
            
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
      }
 	   return valores;
 }  
}  