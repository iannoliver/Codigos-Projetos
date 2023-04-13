package view;

import java.awt.EventQueue;

import javax.swing.JDialog;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JTextField;

import model.DAO;

import javax.swing.JButton;
import javax.swing.ImageIcon;
import java.awt.Cursor;
import java.awt.Toolkit;
import java.awt.event.ActionListener;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.awt.event.ActionEvent;
import javax.swing.JPasswordField;

public class Usuarios extends JDialog {
	DAO dao = new DAO();
	private Connection con;
	private PreparedStatement pst;
	private ResultSet rs;

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private JTextField txtID;
	private JTextField txtNome;
	private JTextField txtLogin;
	private JPasswordField txtSenha;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					Usuarios dialog = new Usuarios();
					dialog.setDefaultCloseOperation(JDialog.DISPOSE_ON_CLOSE);
					dialog.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			
			}
		});
	}

	/**
	 * Create the dialog.
	 */
	public Usuarios() {
		setTitle("Usuarios");
		setIconImage(Toolkit.getDefaultToolkit().getImage(Usuarios.class.getResource("/img/users.png")));
		setBounds(100, 100, 450, 300);
		getContentPane().setLayout(null);
		
		JLabel lblID = new JLabel("ID");
		lblID.setBounds(10, 23, 46, 14);
		getContentPane().add(lblID);
		
		JLabel lblNome = new JLabel("Nome");
		lblNome.setBounds(10, 62, 46, 14);
		getContentPane().add(lblNome);
		
		JLabel lblLogin = new JLabel("Login");
		lblLogin.setBounds(10, 100, 46, 14);
		getContentPane().add(lblLogin);
		
		JLabel lblSenha = new JLabel("Senha");
		lblSenha.setBounds(10, 139, 46, 14);
		getContentPane().add(lblSenha);
		
		txtID = new JTextField();
		txtID.setEditable(false);
		txtID.setBounds(55, 20, 70, 20);
		getContentPane().add(txtID);
		txtID.setColumns(10);
		
		txtNome = new JTextField();
		txtNome.setBounds(55, 59, 184, 20);
		getContentPane().add(txtNome);
		txtNome.setColumns(10);
		
		txtLogin = new JTextField();
		txtLogin.setBounds(55, 97, 184, 20);
		getContentPane().add(txtLogin);
		txtLogin.setColumns(10);
		
		JButton btnNewButton = new JButton("");
		btnNewButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				limparCampos();
			}
		});
		btnNewButton.setIcon(new ImageIcon(Usuarios.class.getResource("/img/eraser.png")));
		btnNewButton.setToolTipText("Apagar");
		btnNewButton.setContentAreaFilled(false);
		btnNewButton.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
		btnNewButton.setBorder(null);
		btnNewButton.setBounds(175, 186, 64, 64);
		getContentPane().add(btnNewButton);
		
		JButton btnPesquisar = new JButton("");
		btnPesquisar.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				buscar();
			}
		});
		btnPesquisar.setToolTipText("Pesquisar");
		btnPesquisar.setIcon(new ImageIcon(Usuarios.class.getResource("/img/pesquisar.png")));
		btnPesquisar.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
		btnPesquisar.setContentAreaFilled(false);
		btnPesquisar.setBorder(null);
		btnPesquisar.setBounds(249, 58, 34, 34);
		getContentPane().add(btnPesquisar);
		
		getRootPane().setDefaultButton(btnPesquisar);
		
		txtSenha = new JPasswordField();
		txtSenha.setBounds(55, 136, 184, 20);
		getContentPane().add(txtSenha);
	}
	private void limparCampos() {
		txtID.setText(null);
		txtNome.setText(null);
		txtLogin.setText(null);
		txtSenha.setText(null);
	}
	
	private void buscar () {
		//testar o evento primeiro
		//System.out.println("Teste do botão buscar");
		//Criar uma variável com a Query (instrução do banco) 
		String read = "select * from usuarios where nome = ?";
		//Tratramento de exceções
		try {
			//abrir a conexão
			con = dao.conectar();
			//PREPARA A EXECUÇÃO DA QUERY(instrução SQL - CRUD Read)
			//O parametro 1 substitui a / pelo conteúdo da caixa de texto 
			pst = con.prepareStatement(read);
			pst.setString(1,  txtNome.getText());
			//executar a Query e buscar o resultado
			rs = pst.executeQuery();
			// uso da estrutura IFELSE para verificar se existe o contato
			// rs.next() -> se existir um contato no banco
			if (rs.next()) {
				//preeccher as caixas de texto com informações
				txtID.setText(rs.getString(1)); //1° campo da tabela
				txtLogin.setText(rs.getString(3));//3° campo da tabela
				txtSenha.setText(rs.getString(4));//4° campo da tabela
			} else {
				//se não exisir um contato
				JOptionPane.showMessageDialog(null, "Contato Inexistente");
			}
			// fechar a conexão(importante)
			con.close();
		} catch (Exception e) {
			System.out.println(e);
		}
	}
}
