package view;

import java.awt.Color;
import java.awt.Cursor;
import java.awt.EventQueue;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.Connection;
import java.text.DateFormat;
import java.util.Date;

import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;

import model.DAO;
import java.awt.Font;

public class Principal extends JFrame {
	DAO dao = new DAO();
	private Connection con;
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private JPanel contentPane;
	private JLabel lblStatus;
	private JLabel lblNewLabel;
	private JLabel lblData;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					Principal frame = new Principal();
					frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the frame.
	 */
	public Principal() {
		setTitle("Sistema - InfoOS");
		setIconImage(Toolkit.getDefaultToolkit().getImage(Principal.class.getResource("/img/users.png")));
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, 641, 480);
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));

		setContentPane(contentPane);
		contentPane.setLayout(null);
		
		JButton btnUsuarios = new JButton("");
		btnUsuarios.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Usuarios usuarios = new Usuarios();
				usuarios.setVisible(true);
			}
		});
		
		lblData = new JLabel("New label");
		lblData.setOpaque(true);
		lblData.setBackground(new Color(12, 163, 143));
		lblData.setFont(new Font("Tempus Sans ITC", Font.PLAIN, 16));
		lblData.setForeground(new Color(255, 255, 255));
		lblData.setBounds(0, 354, 363, 32);
		contentPane.add(lblData);
		
		lblStatus = new JLabel("");
		lblStatus.setIcon(new ImageIcon(Usuarios.class.getResource("/img/1530385_weather_clouds_rain_storm_thunder_icon.png")));
		lblStatus.setBounds(497, 320, 128, 110);
		contentPane.add(lblStatus);
		
		lblNewLabel = new JLabel("");
		lblNewLabel.setOpaque(true);
		lblNewLabel.setBackground(new Color(12, 163, 143));
		lblNewLabel.setBounds(0, 320, 625, 110);
		contentPane.add(lblNewLabel);
		btnUsuarios.setIcon(new ImageIcon(Principal.class.getResource("/img/users.png")));
		btnUsuarios.setToolTipText("Usuários");
		btnUsuarios.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
		btnUsuarios.setBounds(31, 11, 128, 128);
		contentPane.add(btnUsuarios);
		
		JButton btnSobre = new JButton("");
		btnSobre.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				Sobre sobre = new Sobre();
				sobre.setVisible(true);
			}
		});
		btnSobre.setIcon(new ImageIcon(Principal.class.getResource("/img/about.png")));
		btnSobre.setToolTipText("Sobre");
		btnSobre.setContentAreaFilled(false);
		btnSobre.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
		btnSobre.setBorder(null);
		btnSobre.setBounds(556, 11, 48, 48);
		contentPane.add(btnSobre);
		
		JLabel lblNewLabel_1 = new JLabel("New label");
		lblNewLabel_1.setIcon(new ImageIcon(Principal.class.getResource("/img/1055114_bike_bicycle_icon.png")));
		lblNewLabel_1.setBounds(497, 164, 128, 128);
		contentPane.add(lblNewLabel_1);
		status();
		setarData();
	}
	private void status () {
		try {
			con = dao.conectar();
			if (con == null) {
				lblStatus.setIcon(new ImageIcon(Usuarios.class.getResource("/img/1530385_weather_clouds_rain_storm_thunder_icon.png")));
				
			} else {
				lblStatus.setIcon(new ImageIcon(Usuarios.class.getResource("/img/1530392_weather_sun_sunny_temperature_icon.png")));
			}
		} catch (Exception e) {
			System.out.println(e);
		}
}
	/**
	 * Método responsável por setar a data do rodapé
	 */
	private void setarData() {
		Date date = new Date();
		DateFormat formatador = DateFormat.getDateInstance(DateFormat.FULL);
		//alterar o texto da label
		lblData.setText(formatador.format(date));
	}
	}
