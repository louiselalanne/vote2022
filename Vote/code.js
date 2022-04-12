var usuarioID = "";
var senha = "";
var escolha = "";
onEvent("registroPág", "click", function( ) {
  setScreen("telaRegistro");
});
//Lógica de Registro
onEvent("registrar", "click", function( ) {
  setScreen("destino");
  //Capturando id do usuário
  usuarioID = getText("definirIDU");
  //Capturando senha
  senha = getText("definirSenha");
  createRecord("Voters", {uniqueID:usuarioID,password:senha});
});
//Lógica de login
onEvent("login", "click", function( ) {
  usuarioID = getText("uid");
  senha = getText("senha");
  readRecords("Voters", {}, function(records) {
    for (var i =0; i < records.length; i++) {
      if (records[i].uniqueID == usuarioID && records[i].password == senha) {
        setScreen("votação");
      }
    }
  });
});
//Lógica de votação
onEvent("botãoVotar", "click", function( ) {
  if (getProperty("rb_candi0", "checked")) {
    escolha = "Teresa";
  }
  if (getProperty("rb_candi1", "checked")) {
    escolha = "Matheus";
  }
  if (getProperty("rb_candi2", "checked")) {
    escolha = "Thomas";
  }
  readRecords("Candidates", {Candidate:escolha}, function(records) {
    setScreen("telaPré-Carregamento");
    var temp = {};
    temp.id = (records[0]).id;
    temp.Candidate = records[0].Candidate;
    records[0].Votes = records[0].Votes+1;
    temp.Votes = records[0].Votes;
    updateRecord("Candidates", temp, function(record, sucesso) {
      if (sucesso) {
        setTimeout(function() {
          setScreen("Resultado");
        }, 1000);
        drawChartFromRecords("gráfico1", "pie", "Candidates", ["Candidate", "Votes"]);
      }
    });
  });
});
