package view;

import java.awt.EventQueue;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.border.EmptyBorder;

import model.DAO;
import java.awt.Cursor;

public class Agenda extends JFrame {
	//Instanciar objetos JDBC
	DAO dao = new DAO();
	private Connection con;
	private PreparedStatement pst;
	private ResultSet rs;
	

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private JPanel contentPane;
	private JTextField txtID;
	private JTextField txtNome;
	private JTextField txtFone;
	private JTextField txtEmail;
	private JLabel lblStatus;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					Agenda frame = new Agenda();
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
	public Agenda() {
		addWindowListener(new WindowAdapter() {
			@Override
			public void windowActivated(WindowEvent e) {
				//Ativação da janela
				status();
			}
		});
		setTitle("Agenda de contatos");
		setResizable(false);
		setIconImage(Toolkit.getDefaultToolkit().getImage(Agenda.class.getResource("/img/notebook.png")));
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, 497, 300);
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));

		setContentPane(contentPane);
		contentPane.setLayout(null);
		
		JLabel lblNewLabel = new JLabel("Nome:");
		lblNewLabel.setBounds(10, 57, 46, 14);
		contentPane.add(lblNewLabel);
		
		JLabel lblNewLabel_1 = new JLabel("ID:");
		lblNewLabel_1.setBounds(10, 11, 46, 14);
		contentPane.add(lblNewLabel_1);
		
		JLabel lblNewLabel_2 = new JLabel("Fone:");
		lblNewLabel_2.setBounds(10, 115, 46, 14);
		contentPane.add(lblNewLabel_2);
		
		JLabel lblNewLabel_3 = new JLabel("Email:");
		lblNewLabel_3.setBounds(10, 173, 46, 14);
		contentPane.add(lblNewLabel_3);
		
		txtID = new JTextField();
		txtID.setEditable(false);
		txtID.setBounds(50, 8, 86, 20);
		contentPane.add(txtID);
		txtID.setColumns(10);
		
		txtNome = new JTextField();
		txtNome.setBounds(66, 81, 203, 20);
		contentPane.add(txtNome);
		txtNome.setColumns(10);
		
		txtFone = new JTextField();
		txtFone.setBounds(50, 112, 116, 20);
		contentPane.add(txtFone);
		txtFone.setColumns(10);
		
		txtEmail = new JTextField();
		txtEmail.setBounds(50, 170, 203, 20);
		contentPane.add(txtEmail);
		txtEmail.setColumns(10);
		
		JButton btnSobre = new JButton("");
		btnSobre.setContentAreaFilled(false);
		btnSobre.setBorder(null);
		btnSobre.setToolTipText("Sobre");
		btnSobre.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
		btnSobre.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				//clicar no botão SOBRE
				//mostrar a janela Sobre
				Sobre sobre = new Sobre();
				sobre.setVisible(true);
			}
		});
		btnSobre.setIcon(new ImageIcon(Agenda.class.getResource("/img/about.png")));
		btnSobre.setBounds(401, 11, 48, 48);
		contentPane.add(btnSobre);
		
		JButton btnPesquisar = new JButton("");
		btnPesquisar.setContentAreaFilled(false);
		btnPesquisar.setBorder(null);
		btnPesquisar.setIcon(new ImageIcon(Agenda.class.getResource("/img/pesquisar.png")));
		btnPesquisar.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				//Evento clicar no botão
				buscar();
			}
		});
		btnPesquisar.setBounds(263, 41, 50, 40);
		contentPane.add(btnPesquisar);
		
		JButton btnAdicionar = new JButton("");
		btnAdicionar.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
		btnAdicionar.setToolTipText("Adicionar");
		btnAdicionar.setIcon(new ImageIcon(Agenda.class.getResource("/img/adicionar.png")));
		btnAdicionar.setContentAreaFilled(false);
		btnAdicionar.setBorder(null);
		btnAdicionar.setBounds(20, 201, 70, 64);
		contentPane.add(btnAdicionar);
		
		JButton btnEditar = new JButton("");
		btnEditar.setBorder(null);
		btnEditar.setContentAreaFilled(false);
		btnEditar.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
		btnEditar.setIcon(new ImageIcon(Agenda.class.getResource("/img/editar.png")));
		btnEditar.setToolTipText("Editar");
		btnEditar.setBounds(85, 201, 64, 64);
		contentPane.add(btnEditar);
		
		JButton btnExcluir = new JButton("");
		btnExcluir.setIcon(new ImageIcon(Agenda.class.getResource("/img/excluir.png")));
		btnExcluir.setContentAreaFilled(false);
		btnExcluir.setBorder(null);
		btnExcluir.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
		btnExcluir.setToolTipText("Excluir");
		btnExcluir.setBounds(144, 201, 64, 64);
		contentPane.add(btnExcluir);
		
		JButton btnLimpar = new JButton("");
		btnLimpar.setToolTipText("Limpar");
		btnLimpar.setIcon(new ImageIcon(Agenda.class.getResource("/img/eraser.png")));
		btnLimpar.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
		btnLimpar.setBorder(null);
		btnLimpar.setContentAreaFilled(false);
		btnLimpar.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				limparCampos();
			}
		});
		btnLimpar.setBounds(199, 201, 70, 64);
		contentPane.add(btnLimpar);
		
		lblStatus = new JLabel("");
		lblStatus.setIcon(new ImageIcon(Agenda.class.getResource("/img/dboff.png")));
		lblStatus.setBounds(418, 202, 48, 48);
		contentPane.add(lblStatus);
		
		//substituir o click pela tecla enter <ENTER> em um botão
		getRootPane().setDefaultButton(btnPesquisar);
	}//FIM DO CONSTRUTOR
	/**
	 * Limpar campos
	 */
	private void limparCampos() {
		txtID.setText(null);
		txtNome.setText(null);
		txtFone.setText(null);
		txtEmail.setText(null);
	}//fim do método limparCampos
	/**
	 * Método responsavel por exibir o status da conexão
	 */
	private void status () {
		try {
			//Abrir a conexão
			con = dao.conectar();
			if (con == null) {
				//System.out.println("Erro de conexão!");
				lblStatus.setIcon(new ImageIcon(Agenda.class.getResource("/img/dboff.png")));
				
			} else {
				//System.out.println("Banco conectado!");
				lblStatus.setIcon(new ImageIcon(Agenda.class.getResource("/img/dbon.png")));
			}
			//Nunca esquecer de fechar a conexão
		} catch (Exception e) {
			System.out.println(e);
		}
	}//fim do método status da conexão
	/**
	 * Método para buscar um contato pelo nome
	 */
	private void buscar () {
		//testar o evento primeiro
		//System.out.println("Teste do botão buscar");
		//Criar uma variável com a Query (instrução do banco) 
		String read = "select * from contatos where nome = ?";
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
				txtFone.setText(rs.getString(3));//3° campo da tabela
				txtEmail.setText(rs.getString(4));//4° campo da tabela
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
	
}// FIM DO CÓDIGO
