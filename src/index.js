var Funcionario = /** @class */ (function () {
    function Funcionario() {
        this.parcelaDedutivel = 0;
        this.funcionario = {};
    }
    Funcionario.prototype.calculaHoraExtra = function (salarioBruto, horaExtra) {
        this.funcionario.horasContrato = 200;
        this.funcionario.valorHora = salarioBruto / this.funcionario.horasContrato;
        this.funcionario.valorHoraExtra = this.funcionario.valorHora * (!horaExtra ? this.funcionario.horaExtra = 0 : this.funcionario.horaExtra = horaExtra);
        this.funcionario.salarioHoraExtra = salarioBruto + this.funcionario.valorHoraExtra;
        return this.funcionario.salarioHoraExtra;
    };
    Funcionario.prototype.calculaInss = function (salarioBruto) {
        if (salarioBruto <= 1212) {
            this.funcionario.faixaInss = 0.075;
            this.funcionario.descontoInss = salarioBruto * this.funcionario.faixaInss;
        }
        if (salarioBruto >= 1212.01 && salarioBruto <= 2427.35) {
            this.funcionario.faixaInss = 0.09;
            this.funcionario.descontoInss = 1212 * 0.075;
            this.funcionario.descontoInss = this.funcionario.descontoInss + ((salarioBruto - 1212) * this.funcionario.faixaInss);
        }
        if (salarioBruto >= 2427.36 && salarioBruto <= 3641.03) {
            this.funcionario.faixaInss = 0.12;
            this.funcionario.descontoInss = 1212 * 0.075;
            this.funcionario.descontoInss = this.funcionario.descontoInss + (2427.36 - 1212) * 0.09;
            this.funcionario.descontoInss = this.funcionario.descontoInss + ((salarioBruto - 2427.36) * this.funcionario.faixaInss);
        }
        if (salarioBruto >= 3641.04 && salarioBruto <= 7087.22) {
            this.funcionario.faixaInss = 0.14;
            this.funcionario.descontoInss = 1212 * 0.075;
            this.funcionario.descontoInss = this.funcionario.descontoInss + (2427.36 - 1212) * 0.09;
            this.funcionario.descontoInss = this.funcionario.descontoInss + (3641.23 - 2427.36) * 0.12;
            this.funcionario.descontoInss = this.funcionario.descontoInss + ((salarioBruto - 3641.03) * this.funcionario.faixaInss);
        }
        if (salarioBruto >= 7087.23) {
            this.funcionario.descontoInss = 1212 * 0.075;
            this.funcionario.descontoInss = 1212 * 0.075;
            this.funcionario.descontoInss = this.funcionario.descontoInss + (2427.36 - 1212) * 0.09;
            this.funcionario.descontoInss = this.funcionario.descontoInss + (3641.23 - 2427.36) * 0.12;
            this.funcionario.descontoInss = this.funcionario.descontoInss + (7087.22) * 0.14;
        }
        return this.funcionario.descontoInss;
    };
    Funcionario.prototype.calculaIR = function (salarioBruto) {
        if (salarioBruto <= 1903.98) {
            this.funcionario.faixaIr = 0;
            this.funcionario.descontoIr = 0.000;
        }
        if (salarioBruto >= 1903.99 && salarioBruto <= 2826.65) {
            this.funcionario.faixaIr = 0.075;
            this.parcelaDedutivel = 142.80;
            this.funcionario.descontoIr = salarioBruto * this.funcionario.faixaIr - this.parcelaDedutivel;
        }
        if (salarioBruto >= 2826.66 && salarioBruto <= 3751.05) {
            this.funcionario.faixaIr = 0.15;
            this.parcelaDedutivel = 354.80;
            this.funcionario.descontoIr = salarioBruto * this.funcionario.faixaIr - this.parcelaDedutivel;
        }
        if (salarioBruto >= 3751.06 && salarioBruto <= 4664.68) {
            this.funcionario.faixaIr = 0.225;
            this.parcelaDedutivel = 636.13;
            this.funcionario.descontoIr = salarioBruto * this.funcionario.faixaIr - this.parcelaDedutivel;
        }
        if (salarioBruto >= 4664.69) {
            this.funcionario.faixaIr = 0.275;
            this.parcelaDedutivel = 869.36;
            this.funcionario.descontoIr = salarioBruto * this.funcionario.faixaIr - this.parcelaDedutivel;
        }
        return this.funcionario.descontoIr;
    };
    Funcionario.prototype.calculaSalarioLiquido = function (salarioComHoraExtra, descontoInss, descontoIr) {
        this.funcionario.salarioLiquido = salarioComHoraExtra - descontoInss - descontoIr;
        return this.funcionario.salarioLiquido;
    };
    return Funcionario;
}());
var funcionario = new Funcionario();
function principal(nome, salario_bruto, horas_extras) {
    funcionario.funcionario.salarioHoraExtra = funcionario.calculaHoraExtra(salario_bruto, horas_extras);
    funcionario.funcionario.descontoInss = funcionario.calculaInss(funcionario.funcionario.salarioHoraExtra);
    funcionario.funcionario.descontoIr = funcionario.calculaIR(funcionario.funcionario.salarioHoraExtra - funcionario.funcionario.descontoInss);
    funcionario.funcionario.salarioLiquido = funcionario.calculaSalarioLiquido(funcionario.funcionario.salarioHoraExtra, funcionario.funcionario.descontoInss, funcionario.funcionario.descontoIr);
    console.log("Nome: " + nome.toUpperCase());
    console.log("Salário Bruto: " + salario_bruto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    console.log("Horas Extras Mês: " + funcionario.funcionario.horaExtra + "h");
    console.log("Valor Adicionao de Horas Extras: " + funcionario.funcionario.valorHoraExtra.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    console.log("Salário Bruto + Hora Extra: " + funcionario.funcionario.salarioHoraExtra.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    console.log("Faixa INSS: " + (funcionario.funcionario.faixaInss * 100).toFixed(2) + " %");
    console.log("Desconto INSS: " + funcionario.funcionario.descontoInss.toFixed(2));
    console.log("Faixa IR: " + (funcionario.funcionario.faixaIr * 100).toFixed(2) + " %");
    console.log("Desconto IR: " + funcionario.funcionario.descontoIr.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    console.log("Salário Liquido: " + funcionario.funcionario.salarioLiquido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
}
principal(process.argv[2], Number(process.argv[3]), Number(process.argv[4]));
