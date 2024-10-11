package contas;

public class Conta {
	
	//encapsulamento
	//1) usar um modificador private nas variaveis
	//2) cria métodos (getters e setters) para  acessar as variáveis 
	private double saldo;
	private String cliente;
	
	
	
	public double getSaldo() {
		return saldo;
	}

	public void setSaldo(double saldo) {
		this.saldo = saldo;
	}

	public String getCliente() {
		return cliente;
	}

	public void setCliente(String cliente) {
		this.cliente = cliente;
	}
	
	//--------------------Encapsulamento

	//construtor
	public Conta() {
		super();
		System.out.println("Agência 2167");
		
	}
	
	//métodos
	
	/**
	 * Mètodo simples
	 * Exibir o saldo da conta
	 */
	protected void exibirSaldo() {
		System.out.println("Saldo: R$ " + saldo);
	}
	
	/**
	 * Método com parâmetro (Variavel)
	 * @param valor
	 */
	void depositar(double valor) { //neste método obrigatóriamente precia-se de um valor
		saldo += valor;
		System.out.println("Crédito: R$ " + valor);
	}
	
	/**
	 * Método com parâmetro (Variavel)
	 * @param valor
	 */
	void sacar(double valor) {
		saldo -= valor;
		System.out.println("Débito: R$ " + valor);
	}
	
	/**
	 * Método com 2 parâmetros (Objeto e Variável)
	 * @param destino
	 * @param valor
	 */
	void transferir(Conta destino, double valor) {
		this.sacar(valor);
		destino.depositar(valor);
		System.out.println("Transferência: R$ " + valor);
	}
	
	/**
	 * Método com 2 parametros (Variaveis) e Retorno
	 * @param cc1
	 * @param cc2
	 * @return
	 */
	double soma(double cc1, double cc2) {
		double total = cc1 + cc2;
		return total;
	}
}
