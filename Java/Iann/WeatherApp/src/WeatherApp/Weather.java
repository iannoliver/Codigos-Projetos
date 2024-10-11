package WeatherApp;

import java.awt.EventQueue;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;

import org.json.JSONObject;

import java.awt.Color;
import javax.swing.JLabel;
import java.awt.Font;
import javax.swing.JTextField;
import javax.swing.ImageIcon;
import javax.swing.JTextArea;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;




public class Weather extends JFrame {
	String apiKey = "98d0bb5675a8cf41315641e6a7ab9e57";
    String city = "Tokyo";
    String url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

	private JPanel contentPane;
	private JTextField txtWeather;

	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					Weather frame = new Weather();
					frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	public Weather() {
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, 484, 417);
		contentPane = new JPanel();
		contentPane.setBackground(new Color(0, 128, 255));
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));

		setContentPane(contentPane);
		contentPane.setLayout(null);
		
		JLabel lblSun = new JLabel("");
		lblSun.setFont(new Font("Tahoma", Font.BOLD, 15));
		lblSun.setIcon(new ImageIcon(Weather.class.getResource("/img/1530392_weather_sun_sunny_temperature_icon.png")));
		lblSun.setToolTipText("Sun");
		lblSun.setBounds(0, 0, 128, 128);
		contentPane.add(lblSun);
		
		JLabel lblNewLabel = new JLabel("Weather Prevision");
		lblNewLabel.setForeground(new Color(255, 255, 255));
		lblNewLabel.setFont(new Font("Tahoma", Font.BOLD, 15));
		lblNewLabel.setBounds(113, 62, 158, 44);
		contentPane.add(lblNewLabel);
		
		JLabel lblNewLabel_1 = new JLabel("Result of "+ city + ":");
		lblNewLabel_1.setFont(new Font("Tahoma", Font.BOLD, 15));
		lblNewLabel_1.setBounds(0, 219, 212, 14);
		contentPane.add(lblNewLabel_1);
		
		txtWeather = new JTextField();
		txtWeather.setBounds(0, 264, 468, 114);
		contentPane.add(txtWeather);
		txtWeather.setColumns(10);
		
		String[] tempo = dados();
		
		txtWeather.setText(tempo[0]+" "+tempo[1]);
		
		
	}//construtor
	
	public String[] dados() {
 	
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
	
}//código
