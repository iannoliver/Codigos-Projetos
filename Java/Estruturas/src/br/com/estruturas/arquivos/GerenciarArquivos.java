package br.com.estruturas.arquivos;

import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;
import javax.swing.JLabel;
import javax.swing.JOptionPane;

import java.awt.Font;
import javax.swing.JTextField;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.JButton;
import java.awt.Toolkit;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;

public class GerenciarArquivos extends JFrame {

	private JPanel contentPane;
	private JTextField txtNomeArquivo;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					GerenciarArquivos frame = new GerenciarArquivos();
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
	public GerenciarArquivos() {
		setIconImage(Toolkit.getDefaultToolkit().getImage(GerenciarArquivos.class.getResource("/br/com/estruturas/ibagens/2976479_finger_gesture_hand_middle_icon (1).png")));
		setResizable(false);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, 450, 313);
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));

		setContentPane(contentPane);
		setLocationRelativeTo(null);//centraliza a janela
		contentPane.setLayout(null);
		
		JLabel lblNomeArquivo = new JLabel("Nome do Arquivo");
		lblNomeArquivo.setFont(new Font("Sitka Text", Font.PLAIN, 13));
		lblNomeArquivo.setBounds(10, 11, 127, 48);
		contentPane.add(lblNomeArquivo);
		
		JLabel lblConteudo = new JLabel("Contéudo");
		lblConteudo.setFont(new Font("Sitka Text", Font.PLAIN, 13));
		lblConteudo.setBounds(10, 81, 127, 48);
		contentPane.add(lblConteudo);
		
		txtNomeArquivo = new JTextField();
		txtNomeArquivo.setBounds(153, 17, 271, 32);
		contentPane.add(txtNomeArquivo);
		txtNomeArquivo.setColumns(10);
		
		JScrollPane scrollPane = new JScrollPane();
		scrollPane.setBounds(10, 110, 414, 151);
		contentPane.add(scrollPane);
		
		JTextArea txtConteudo = new JTextArea();
		scrollPane.setViewportView(txtConteudo);
		
		JButton btnGravar = new JButton("Gravar");
		btnGravar.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				if (txtNomeArquivo.getText().trim().equals("")||
						txtConteudo.getText().trim().equals("")) {
					JOptionPane.showMessageDialog(null,"Você deve preencher os campos");
				}
				String s = GerarArquivo.gravar(txtNomeArquivo.getText(),txtConteudo.getText());
				JOptionPane.showMessageDialog(null,s);
			}
		});
		btnGravar.setBounds(153, 76, 89, 23);
		contentPane.add(btnGravar);
	}
}
