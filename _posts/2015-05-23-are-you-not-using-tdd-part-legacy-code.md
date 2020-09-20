---
layout: post
title: ARE YOU NOT USING TDD?! – PART || (Legacy code)
date: 2015-05-23 18:33:47.000000000 -03:00
image: /images/posts/2015-05-23-are-you-not-using-tdd-part-legacy-code/cover.png
type: article
published: true
status: publish
categories:
- TDD
tags:
- code base,
- features,
- legacy code,
- lines,
- tdd,
- legacy
---

In the part one I introduced the life cycle of TDD
[you can see here]({{ site.baseurl }}{% post_url 2015-04-19-not-using-tdd-part-1 %}) and how it works, but often people come to me and ask about the legacy code how can we start
using TDD with legacy code? Should we start from zero? Should we use baby-steps?

I decided to share my experience in how I used TDD in legacy code and how I did
to get this task done also I have to say many thanks to my friend Alexandre
Cintra who helped my a lot giving me gold tips.

## Edit: Jun 17, 2015

You can find useful information in my slides below. It was created for
[my talk at Samsung Ocean](http://www.meetup.com/pt/THT-Things-Hacker-Team/events/222831499){:target="_blank"}.

<iframe width="100%" height="500" style="border: 1px solid #CCC; border-width: 1px; margin-bottom: 5px; max-width: 100%;" src="//www.slideshare.net/slideshow/embed_code/key/vO17674rb2GiBI" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" allowfullscreen="allowfullscreen"> </iframe>

## Edit: July 28, 2015

Legacy software systems . . . were developed decades ago and have been
continually modified to meet changes in business requirements and computing
platforms. The proliferation of such systems is causing headaches for
large organizations who find them costly to maintain and risky to evolve -
Dayani-Fard

## Legacy code the nightmare of everyone

Doesn't matter if you are in a big company or a small one it is normal to have
legacy code and you will need to maintain and even do some improvements as the
request of our client comes.

How can I identify legacy that is impossible to test?

1. Many responsibilities: Usually legacy code has many lines between 1000 and
2000 (I've seen many with 3000) and do everything in one file database
connection, data persistence, business logic, IO are a couple of examples.

2. Without code pattern: A "great" feature of legacy code is the lack of
pattern in its code. When you touch the code base you usually see huge
files and also blank files, once I was just playing around in a company
repository and I saw a model without one single line just with its declaration
therefore in the controller was everything else the access data, DAO and
even the queries were wrote in the controller!

```php
<?php

class MyLegacyClass {
	
	    // omitted code with 50 lines also construct method and some properties was took off
            public function setXml($xml) {
            	try {
            		$this->xml = $xml;
            		return $this;
            	} catch(Exception $e) {
            		exit($e->getMessage());
            	}
            }

            public function getXml() {
            	return $this->xml;
            }
             
            public function getModalRodoviario() {
            	try {
            		$xml = $this->getXml();
            		return $xml->rodo;
            	} catch(Exception $e) {
            		exit($e->getMessage());
            	}
            }
             
            public function printXML() {
            	$xml = $this->getXml();
            	print($xml->asXML());
            	exit;
            }
             
            public function setIdeValues($config, $Cte) {
            	$xml = $this->getXml();

            	$ide = $xml->infCte->addChild('ide');

            	$confIde = $config;

            	$camposObrigatoriosConfIde = array(
			//omitted code 31 lines
            	);

            	$confToma = $confIde['toma'];

            	if($confToma == '4') {
            		$confToma4 = $confIde['toma4'];
            		unset($confIde['toma4']);
            	}

            	unset($confIde['toma']);

            	$confIde['cUF'] = $this->estadosIBGE[$confIde['cUF']];

            	$this->chaveAcesso = $this->calculaChaveAcesso(
            	$confIde['cUF'],
            	substr(str_replace('-', '', $confIde['dhEmi']),2,4),
            	$Cte['Empresa']['Entidade']['ent_cnpj'],
            	$confIde['mod'],
            	$confIde['serie'],
            	$confIde['nCT'],
            	$confIde['tpEmis'],
            	$confIde['cCT']
            	);

            	$Cte->cte_chave = $this->chaveAcesso;

            	$Cte->save();

            	$confIde['cDV'] = $this->digVer;

            	$xml->infCte->addAttribute('Id', 'CTe' . $this->chaveAcesso);

            	foreach($confIde as $node => $nodeValue) {
            		if($nodeValue != "" && !is_array($nodeValue)) {
            			$ide->addChild($node, $nodeValue);
            		} else {
            			if(array_key_exists($node, $camposObrigatoriosConfIde))
            			throw new Exception($camposObrigatoriosConfIde[$node]);
            		}
            	}

            	//		exit;
            	if(isset($confToma4)) {
            		$toma4 = $ide->addChild('toma4');
            		$toma4->addChild('toma', $confToma);
            		 
            		$camposObrigatoriosTomador = array(
				//omitted code 9 lines
            		);
            		 
            		$confToma4['toma_data_ent_cont'] = date('Y-m-d H:i:s');
            		$confToma4['toma_justificativa_cont'] = "Justificativa teste";
            		 
            		foreach($camposObrigatoriosTomador as $campo => $mensagemErro) {
            			if($confToma4[$campo] == "")
            			throw new Exception($mensagemErro);
            		}
            		 
            		$dePara = array(
				'fone' => 'toma_telefone',
				'xLgr' => 'toma_end_logradouro',
				'nro' => 'toma_end_nro',
				'xCpl' => 'toma_end_cpl',
				'xBairro' => 'toma_end_bairo',
				'cMun' => 'toma_end_cod_mun',
				'xMun' => 'toma_end_mun',
				'UF' => 'toma_end_uf_sigla',
            		//'CEP' => 'toma_end_cep',
				'cPais' => 'toma_cod_end_pais',
				'xPais' => 'toma_end_pais',
				'email' => 'toma_cont_email',
            		//'xJust' => 'toma_justificativa_cont'
            		);
            		 
            		if(strlen($confToma4['toma_cpf_cnpj']) == 11) {
            			$toma4->addChild('CPF', $confToma4['toma_cpf_cnpj']);
            			if($confToma4['toma_nome']!="")
            			$toma4->addChild('xNome', $confToma4['toma_nome']);
            		} else {
            			$toma4->addChild('CNPJ', $confToma4['toma_cpf_cnpj']);
            			if($confToma4['toma_fantasia']!="")
            			$toma4->addChild('xFant', $confToma4['toma_fantasia']);
            			if($confToma4['toma_ie']!="")
            			$toma4->addChild('IE', $confToma4['toma_ie']);
            		}
            		 
            		if(!empty($confToma4['toma_telefone']))
            		$toma4->addChild('fone', $confToma4['toma_telefone']);
            		 
            		$enderToma = $toma4->addChild('enderToma');

            		foreach($dePara as $de => $para) {
            			$confToma4[$para] = $this->cleaner($confToma4[$para]);
            			if($confToma4[$para]!="")
            			$enderToma->addChild($de, $confToma4[$para]);
            		}
            		 
            		/*if(!empty($confToma4['toma_data_ent_cont']))
            		 $enderToma->addChild('dhCont', implode('T', explode(' ', $confToma4['toma_data_ent_cont'])));*/
            	} else {
            		$toma03 = $ide->addChild('toma03');
            		$toma03->addChild('toma', $confToma);
            	}

            	$this->setXml($xml);
            }

            public function setCompl($config) {
            	//		if($this->validaInputacao($config)) {
            	$xml = $this->getXml();

            	$compl = $xml->infCte->addChild('compl');

            	$confComplPrimeiroBloco = array(
					'xCaracAd', 
					'xCaracSer', 
					'xEmi'
					);

					foreach($confComplPrimeiroBloco as $node) {
						$config[$node] = $this->cleaner($config[$node]);
						if($config[$node]!="")
						$compl->addChild($node, $config[$node]);
					}

					if($config['fluxo']['xOrig'] != "" || $config['fluxo']['pass'] != "") {
						$fluxo = $compl->addChild('fluxo');
					}

					if(!empty($config['fluxo']['xOrig'])) {
						$fluxo->addChild('xOrig', $config['fluxo']['xOrig']);
					}

					if($config['fluxo']['pass'] != "" && count($config['fluxo']['pass']) > 0) {
						foreach($config['fluxo']['pass'] as $pass) {
							$xpass = $fluxo->addChild('pass');

							$nodesPass = array(
						'xPass' => 'cdp_sigla_aeroporto_passagem',
						'xDest' => 'cdp_sigla_aeroporto_destino',
						'xRota' => 'cdp_codigo_rota_entrega'
						);
							
						foreach($nodesPass as $nodePass => $nodePassIndex) {
							$pass[$nodePassIndex] = $this->cleaner($pass[$nodePassIndex]);
							if($pass[$nodePassIndex]!="")
							$xpass->addChild($nodePass, $pass[$nodePassIndex]);
						}
						}
					}

					if(count($config['Entrega'])) {
						$Entrega = $compl->addChild('Entrega');

						$config['Entrega']['tpPer'] = $this->cleaner($config['Entrega']['tpPer']);

						if($config['Entrega']['tpPer']=="")

						switch($config['Entrega']['tpPer']) {
							case '0' :
								$semData = $Entrega->addChild('semData');
								$semData->addChild('tpPer', $config['Entrega']['tpPer']);
								break;
							case '1' :
							case '2' :
							case '3' :
								$comData = $Entrega->addChild('comData');
								$comData->addChild('tpPer', $config['Entrega']['tpPer']);
								$config['Entrega']['dProg'] = $this->cleaner($config['Entrega']['dProg']);

								if($config['Entrega']['dProg']!="")
								$comData->addChild('tpPer', $config['Entrega']['dProg']);
								
								break;
							case '4' :
								$noPeriodo = $Entrega->addChild('noPeriodo');
								$noPeriodo->addChild('tpPer', $config['Entrega']['tpPer']);
								$config['Entrega']['dtIni'] = $this->cleaner($config['Entrega']['dtIni']);
								if($config['Entrega']['dtIni']!="")
								$noPeriodo->addChild('dtIni', $config['Entrega']['dtIni']);
								
								$config['Entrega']['dtFim'] = $this->cleaner($config['Entrega']['dtFim']);
								if($config['Entrega']['dtFim']!="")
								$noPeriodo->addChild('dtFim', $config['Entrega']['dtFim']);
								
								break;
						}

						$config['Entrega']['tpHor'] = $this->cleaner($config['Entrega']['tpHor']);

						switch($config['Entrega']['tpHor']) {
							case '0' :
								$semHora = $Entrega->addChild('semHora');
								$semHora->addChild('tpHor', $config['Entrega']['tpHor']);
								break;
							case '1' :
							case '2' :
							case '3' :
								$comHora = $Entrega->addChild('comHora');
								$comHora->addChild('tpHor', $config['Entrega']['tpHor']);
								$config['Entrega']['hProg'] = $this->cleaner($config['Entrega']['hProg']);
								if($config['Entrega']['hProg']!="")
								$comHora->addChild('tpHor', $config['Entrega']['hProg']);
								break;
							case '4' :
								$noInter = $Entrega->addChild('noInter');
								$noInter->addChild('tpHor', $config['Entrega']['tpHor']);
								$config['Entrega']['hIni'] = $this->cleaner($config['Entrega']['hIni']);
								if($config['Entrega']['hIni']!="")
								$noInter->addChild('hIni', $config['Entrega']['hIni']);
								$config['Entrega']['hFim'] = $this->cleaner($config['Entrega']['hFim']);
								if($config['Entrega']['hFim']!="")
								$noInter->addChild('hFim', $config['Entrega']['hFim']);
								break;
						}
					}

					if ( !empty($config['xObs']) ){
						$compl->addChild('xObs', $config['xObs']);
					}

					if(isset($config['ObsCont']) && count($config['ObsCont']) > 0) {
						foreach($config['ObsCont'] as $ObsCont) {
							$xObsCont = $compl->addChild('ObsCont');

							$ObsCont['coic_identificador'] = $this->cleaner($ObsCont['coic_identificador']);
							if($ObsCont['coic_identificador']!="")
							$xObsCont->addChild('xCampo', $ObsCont['coic_identificador']);
							$ObsCont['coic_obs'] = $this->cleaner($ObsCont['coic_obs']);
							if($ObsCont['coic_obs']!="")
							$xObsCont->addChild('xTexto', $ObsCont['coic_obs']);
						}
					}

					if(isset($config['ObsFisco']) && count($config['ObsFisco']) > 0) {
						foreach($config['ObsFisco'] as $ObsFisco) {
							$xObsFisco = $compl->addChild('ObsFisco');

							$ObsFisco['coif_identificador'] = $this->cleaner($ObsFisco['coif_identificador']);
							if($ObsFisco['coif_identificador']!="")
							$xObsFisco->addChild('xCampo', $ObsFisco['coif_identificador']);
							$ObsFisco['coif_obs'] = $this->cleaner($ObsFisco['coif_obs']);
							if($ObsFisco['coif_obs']!="")
							$xObsFisco->addChild('xTexto', $ObsFisco['coif_obs']);
						}
					}

					$this->setXml($xml);
					//		}
            }

            public function setEmitValues($config) {
            	$xml = $this->getXml();

            	$emitDePara = array(
			'CNPJ' => 'CNPJ',
			'IE' => 'IE',
			'xNome' => 'nome_razao',
			'xFant' => 'fantasia'
			);

			$camposObrigatorios = array(
			//omitted code 3 lines
			);

			$emit = $xml->infCte->addChild('emit');

			foreach($emitDePara as $node => $nodeValue) {
				$config[$nodeValue] = $this->cleaner($config[$nodeValue]);
					
				if($config[$nodeValue]!="") {
					$emit->addChild($node, $config[$nodeValue]);
				} else {
					if(array_key_exists($node, $camposObrigatorios)) {
						throw new Exception($camposObrigatorios[$node]);
					}
				}
			}

			$emitEnderDePara = array(
				'xLgr' => 'logradouro',
				'nro' => 'numero',
				'xCpl' => 'complemento',
				'xBairro' => 'bairro',
				'cMun' => 'cod_municipio',
				'xMun' => 'municipio',
				'UF' => 'UF',
				'fone' => 'fone'
				);
					
				$camposObrigatoriosEnder = array(
				//omitted code 7 lines
				);
					
				$enderEmit = $emit->addChild('enderEmit');
					
				foreach($emitEnderDePara as $node => $nodeValue) {
					$config[$nodeValue] = $this->cleaner($config[$nodeValue]);

					if($config[$nodeValue]!="") {
						$enderEmit->addChild($node, $config[$nodeValue]);
					} else {
						if(array_key_exists($node, $camposObrigatoriosEnder)) {
							throw new Exception($camposObrigatoriosEnder[$node]);
						}
					}
				}
					
				$this->setXml($xml);
            }

            public function setRemValues($config) {
            	$config = $this->limpaEspacos($config);
            	$xml = $this->getXml();

            	$rem = $xml->infCte->addChild('rem');
            	if(strlen($config['cpfcnpj']) == 14) {
            		$rem->addChild('CNPJ', str_pad($config['cpfcnpj'], 14, '0', STR_PAD_LEFT));
            	} else {
            		$rem->addChild('CPF', str_pad($config['cpfcnpj'], 11, '0', STR_PAD_LEFT));
            	}

            	if ( !is_numeric($config['IE']) ) {
            		$rem->addChild('IE', '000000000');
            	} else {
            		$rem->addChild('IE', str_pad($config['IE'], 9, STR_PAD_LEFT));
            	}

            	if ( TIPO_AMBIENTE_CTE == 2 ) {
            		$config['nome'] = 'CT-E EMITIDO EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL';
            		$config['xFant'] = 'CT-E EMITIDO EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL';
            	}

            	$rem->addChild('xNome',$config['nome']);
            	$rem->addChild('xFant', $config['nome']);

            	if (!empty($config['fone'])){
            		$rem->addChild('fone', $config['fone']);
            	}
            	$enderReme = $rem->addChild('enderReme');

            	$enderReme->addChild('xLgr', $config['logradouro']);
            	$enderReme->addChild('nro', $config['numero']);
            	$enderReme->addChild('xCpl', $config['bairro']);
            	$enderReme->addChild('xBairro', $config['bairro']);
            	$enderReme->addChild('cMun', $config['cod_municipio']);
            	$enderReme->addChild('xMun', $config['municipio']);

            	if ( !empty($config['CEP']) ) {
            		$enderReme->addChild('CEP', str_pad($config['CEP'], 8, STR_PAD_LEFT));
            	}

            	$enderReme->addChild('UF', $config['UF']);
            	$enderReme->addChild('cPais', $config['cod_pais']);
            	$enderReme->addChild('xPais', $config['pais']);

            	if ( !empty($config['email']) ) {
            		$rem->addChild('email', $config['email']);
            	}

            	
            	$this->setXml($xml);

            }
             
            public function setDestValues($config) {
            	$xml = $this->getXml();

            	$dest = $xml->infCte->addChild('dest');

            	if(strlen($config['cpfcnpj']) == 14) {
            		$dest->addChild('CNPJ', $config['cpfcnpj']);
            	} else {
            		$dest->addChild('CPF', $config['cpfcnpj']);
            	}

            	if ( !is_numeric($config['IE']) ) {
            		$dest->addChild('IE', '000000000');
            	} else {
            		$dest->addChild('IE', str_pad($config['IE'], 9, STR_PAD_LEFT));
            	}

            	if ( TIPO_AMBIENTE_CTE == 2 ) {
            		$config['nome'] = 'CT-E EMITIDO EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL';
            	}

            	$dest->addChild('xNome', $config['nome']);

            	if( !empty($config['fone']) ) {
            		$dest->addChild('fone', $config['fone']);
            	}

            	$enderDest = $dest->addChild('enderDest');
            	$enderDest->addChild('xLgr', $config['logradouro']);
            	$enderDest->addChild('nro', str_pad($config['numero'], 3, STR_PAD_LEFT));

            	if( !empty($config['complemento']) ) {
            		$enderDest->addChild('xCpl', $config['complemento']);
            	}
            	$enderDest->addChild('xBairro', $config['bairro']);
            	$enderDest->addChild('cMun', $config['cod_municipio']);
            	$enderDest->addChild('xMun', $config['municipio']);

            	if( !empty($config['CEP']) ) {
            		$enderDest->addChild('CEP', str_pad($this->cleaner($config['CEP']), 8, '0', STR_PAD_LEFT));
            	}

            	$enderDest->addChild('UF', $config['UF']);

            	if( !empty($config['cod_pais']) ) {
            		$enderDest->addChild('cPais', $config['cod_pais']);
            	}
            	if( !empty($config['pais']) ) {
            		$enderDest->addChild('xPais', $config['pais']);
            	}

            	if( !empty($config['email']) ) {
            		$dest->addChild('email', $config['email']);
            	}

            

            	$this->setXml($xml);
            }
             
            public function setRecValues($config) {
            	$xml = $this->getXml();

            	$rec = $xml->infCte->addChild('receb');

            	if(strlen($config['cpfcnpj']) == 14) {
            		$rec->addChild('CNPJ', $config['cpfcnpj']);
            	} else {
            		$rec->addChild('CPF', $config['cpfcnpj']);
            	}

            	if ( !is_numeric($config['IE']) ) {
            		$rec->addChild('IE', '000000000');
            	} else {
            		$rec->addChild('IE', str_pad($config['IE'], 9, STR_PAD_LEFT));
            	}

            	if ( TIPO_AMBIENTE_CTE == 2 ) {
            		$config['nome'] = 'CT-E EMITIDO EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL';
            	}
            	$rec->addChild('xNome', $config['nome']);

            	if( !empty($config['fone']) ) {
            		$rec->addChild('fone', $config['fone']);
            	}
            	$enderRec = $rec->addChild('enderReceb');
            	$enderRec->addChild('xLgr', $config['logradouro']);
            	$enderRec->addChild('nro', str_pad($config['numero'], 3, STR_PAD_LEFT));

            	if( !empty($config['complemento']) ) {
            		$enderRec->addChild('xCpl', $config['complemento']);
            	}
            	$enderRec->addChild('xBairro', $config['bairro']);
            	$enderRec->addChild('cMun', $config['cod_municipio']);
            	$enderRec->addChild('xMun', $config['municipio']);

            	if( !empty($config['CEP']) ) {
            		$enderRec->addChild('CEP', $config['CEP']);
            	}

            	$enderRec->addChild('UF', $config['UF']);

            	if( !empty($config['cod_pais']) ){
            		$enderRec->addChild('cPais', $config['cod_pais']);
            	}

            	if( empty($config['pais']) ) {
            		$enderRec->addChild('xPais', $config['pais']);
            	}

            	if( !empty($config['email']) ) {
            		$rec->addChild('email', $config['email']);
            	}
            	$this->setXml($xml);
            }

            public function setExpValues($config) {
            	$xml = $this->getXml();
            	$exp = $xml->infCte->addChild('exped');

            	if(strlen($config['cpfcnpj']) == 14) {
            		$exp->addChild('CNPJ', $config['cpfcnpj']);
            	} else {
            		$exp->addChild('CPF', $config['cpfcnpj']);
            	}

            	if ( !is_numeric($config['IE']) ) {
            		$exp->addChild('IE', '000000000');
            	} else {
            		$exp->addChild('IE', str_pad($config['IE'], 9, STR_PAD_LEFT));
            	}

            	if ( TIPO_AMBIENTE_CTE == 2 ) {
            		$config['nome'] = 'CT-E EMITIDO EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL';
            	}
            	$exp->addChild('xNome', $config['nome']);

            	$config['fone'] = $this->cleaner($config['fone']);

            	if( !empty($config['fone']) ) {
            		$exp->addChild('fone', $config['fone']);
            	}

            	$enderExp = $exp->addChild('enderExped');
            	$enderExp->addChild('xLgr', $config['logradouro']);
            	$enderExp->addChild('nro', str_pad($config['numero'], 3, STR_PAD_LEFT));

            	if($this->cleaner($config['complemento']))
            	$enderExp->addChild('xCpl', $config['complemento']);

            	$enderExp->addChild('xBairro', $config['bairro']);
            	$enderExp->addChild('cMun', $config['cod_municipio']);
            	$enderExp->addChild('xMun', $config['municipio']);

            	if($this->cleaner($config['CEP']))
            	$enderExp->addChild('CEP', $config['CEP']);

            	$enderExp->addChild('UF', $config['UF']);

            	if($this->cleaner($config['cod_pais'])!="")
            	$enderExp->addChild('cPais', $config['cod_pais']);

            	if($this->cleaner($config['pais'])!="")
            	$enderExp->addChild('xPais', $config['pais']);

            	if( !empty($config['email']) ) {
            		$exp->addChild('email', $config['email']);
            	}

            	$this->setXml($xml);
            }

            
            public function setInfCteComp($config) {
            	$xml = $this->getXml();

            	if($config['chave']!="") {
            		$infCteComp = $xml->infCte->addChild('infCteComp');
            		$infCteComp->addChild('chave', $config['chave']);
            	}

            	$this->setXml($xml);
            }

            public function setInfCteAnu($config) {
            	$xml = $this->getXml();

            	if($config['chCte']!="" && $config['dEmi']!="") {
            		$infCteAnu = $xml->infCte->addChild('infCteAnu');
            		$infCteAnu->addChild('chCte', $config['chCte']);
            		$infCteAnu->addChild('dEmi', $config['dEmi']);
            	}

            	$this->setXml($xml);
            }

            public function setAutXML($config) {
            	$xml = $this->getXml();

            	foreach($config as $cda) {
            		$autXML = $xml->infCte->addChild('autXML');
            		 
            		if(strlen($cda['cda_cpf_cnpj_autori']) == 14)
            		$autXML->addChild('CNPJ', $cda['cda_cpf_cnpj_autori']);
            		else
            		$autXML->addChild('CPF', $cda['cda_cpf_cnpj_autori']);
            	}

            	$this->setXml($xml);
            }

            public function setModalRodoviario($config) {
            	$xml = $this->getXml();
            	$rodo = $xml->infCte->infCTeNorm->infModal->addChild('rodo');
            	$modal = $config['rodo'];

            	$rodo->addChild('RNTRC', $modal['RNTRC']);
            	$rodo->addChild('dPrev', $modal['dPrev']);
            	$rodo->addChild('lota', $modal['lota']);

            	if( !empty($modal['CIOT']) ) {
            		$rodo->addChild('CIOT', str_pad($this->cleaner($modal['CIOT']), 12, STR_PAD_LEFT));
            	}

            	if(isset($modal['occ']) && count($modal['occ']) > 0) {
            		foreach($modal['occ'] as $occ) {
            			$xocc = $rodo->addChild('occ');

            			$xocc->addChild('serie', $occ['occ_serie']);
            			$xocc->addChild('nOcc', $occ['occ_numero']);
            			$xocc->addChild('dEmi', $occ['occ_demi']);

            			$emiOcc = $xocc->addChild('emiOcc');

            			$emiOcc->addChild('CNPJ', $occ['occ_cnpj']);

            			if($this->cleaner($occ['occ_cint'])!="")
            			$emiOcc->addChild('cInt', $occ['occ_cint']);

            			$emiOcc->addChild('IE', $occ['occ_ie']);
            			$emiOcc->addChild('UF', $occ['Uf']['uf_sigla']);

            			if($this->cleaner($occ['occ_fone'])!="")
            			$emiOcc->addChild('fone', $occ['occ_fone']);
            		}
            	}

            	if(isset($modal['valePed']) && count($modal['valePed']) > 0) {
            		foreach($modal['valePed'] as $valePed) {
            			$xValePed = $rodo->addChild('valePed');

            			$xValePed->addChild('CNPJForn', $valePed['vpd_cnpj_forn']);
            			$xValePed->addChild('nCompra', $valePed['vpd_ncompra']);

            			if($this->cleaner($valePed['vpd_cnpj_pg'])!="")
            			$xValePed->addChild('CNPJPg', $valePed['vpd_cnpj_pg']);

            			$xValePed->addChild('vValePed', $valePed['vpd_valor_vale_pedagio']);
            		}
            	}

            	if(isset($modal['veic']) && count($modal['veic']) > 0) {
            		foreach($modal['veic'] as $confVeic){
            			$veic = $rodo->addChild('veic');

            			if($this->cleaner($confVeic['CteVeiculo']['cve_cod_interno'])!="")
            			$veic->addChild('cInt', $confVeic['CteVeiculo']['cve_cod_interno']);

            			$veic->addChild('RENAVAM', $confVeic['CteVeiculo']['cve_renavam']);
            			$veic->addChild('placa', str_replace(' ', '', $confVeic['CteVeiculo']['cve_placa'])); // remove qualquer espa\E7o branco
            			$veic->addChild('tara', $confVeic['CteVeiculo']['cve_tara']);
            			$veic->addChild('capKG', $confVeic['CteVeiculo']['cve_capacidade_kg']);
            			$veic->addChild('capM3', $confVeic['CteVeiculo']['cve_capacidade_mc']);
            			$veic->addChild('tpProp', $confVeic['CteVeiculo']['cve_proprietario']);
            			$veic->addChild('tpVeic', $confVeic['CteVeiculo']['CteVeiculoTipo']['cvt_codigo']);
            			$veic->addChild('tpRod', $confVeic['CteVeiculo']['CteVeiculoRodado']['cvr_codigo']);
            			$veic->addChild('tpCar', $confVeic['CteVeiculo']['CteVeiculoCarroceria']['cvc_codigo']);
            			$veic->addChild('UF', $confVeic['CteVeiculo']['Uf']['uf_sigla']);

            			if($confVeic['CteVeiculo']['cve_proprietario'] != 'P') {
            				$prop = $rodo->addChild('prop');
            				$infoVeicProp = CteVeiculo::consultaVeiculo($confVeic['CteVeiculo']['cve_id']);
            				 
            				$veicProp = reset($infoVeicProp['CteEmpresaVeiculoProprietarioAtrb']);
            				$veicPropTipo = $veicProp['CteEmpresaVeiculoProprietarioTipo'];
            				 
            				if($veicProp['evpa_tipo_pessoa'] == 'FIS'){
            					$prop->addChild('CPF', $veicProp['evpa_cpf_cnpj']);
            				} else {
            					$prop->addChild('CNPJ', $veicProp['evpa_cpf_cnpj']);
            				}
            				$prop->addChild('RNTRC', $veicProp['evpa_rntrc']);
            				$prop->addChild('xNome', $veicProp['evpa_nome_razao']);
            				$prop->addChild('IE', $veicProp['evpa_rg_ie']);
            				$prop->addChild('UF', $veicProp['Uf']['uf_sigla']);
            				$prop->addChild('tpProp', $veicPropTipo['evpt_codigo']);
            			}
            		}
            	}

            	if(isset($modal['lacre']) && count($modal['lacre']) > 0) {
            		foreach($modal['lacre'] as $infLacre) {
            			$lacRodo = $rodo->addChild('lacRodo');

            			$lacRodo->addChild('nLacre', $infLacre['cmrl_num_lacre']);
            		}
            	}

            	if(isset($modal['moto']) && count($modal['moto']) > 0) {
            		foreach($modal['moto'] as $infMoto) {
            			$moto = $rodo->addChild('moto');

            			$moto->addChild('xNome', $infMoto['CteMotorista']['mot_nome']);
            			$moto->addChild('CPF', $infMoto['CteMotorista']['mot_cpf']);
            		}
            	}

            	$this->setXml($xml);
            }

            public function setVPrestValues($config) {
            	$xml = $this->getXml();

            	$vPrest = $xml->infCte->addChild('vPrest');

            	$vPrest->addChild('vTPrest', empty($config['vTPrest'])? '0.00' : $config['vTPrest']);
            	$vPrest->addChild('vRec', empty($config['vRec'])? '0.00' : $config['vRec']);

            	if(isset($config['Comp']) && count($config['Comp']) > 0) {
            		// \E8 obrigat\F3rio ter um elemento filho do Comp para emitir a nota
            		foreach($config['Comp'] as $Comp) {
            			// \E8 necess\E1rio fazer a verifica\E7\E3o para n\E3o ocorrer erros no xml
            			if ( !empty($Comp['cic_nome_componente']) && !empty($Comp['cic_valor_componente']) ){
            				$xComp = $vPrest->addChild('Comp');
            				// verificar se esse campo \E9 vazio caso contr\E1rio ocorrer\E1 um erro no xml
            				$xComp->addChild('xNome', (empty($Comp['cic_nome_componente']))? 'ND' : $Comp['cic_nome_componente']);
            				$xComp->addChild('vComp', (empty($Comp['cic_valor_componente']))? '00.00' : $Comp['cic_valor_componente']); //13,2 ER25 15 posi\E7\F5es, sendo 13 inteiras e 2 decimais.
            			}
            		}
            	}

            	$this->setXml($xml);
            }

            public function setImpValues($config) {
            	$xml = $this->getXml();

            	$imp = $xml->infCte->addChild('imp');

            	$ICMS = $imp->addChild('ICMS');

            	switch($config['CST']) {
            		case '00' :
            			$ICMS00 = $ICMS->addChild('ICMS00');

            			$ICMS00->addChild('CST', $config['CST']);
            			$ICMS00->addChild('vBC', $config['vBC']);
            			$ICMS00->addChild('pICMS', $config['pICMS']);
            			$ICMS00->addChild('vICMS', $config['vICMS']);
            			break;
            		case '20' :
            			$ICMS20 = $ICMS->addChild('ICMS20');
            			$ICMS20->addChild('CST', $config['CST']);
            			$ICMS20->addChild('pRedBC', $config['pRedBC']);
            			$ICMS20->addChild('vBC', $config['vBC']);
            			$ICMS20->addChild('pICMS', $config['pICMS']);
            			$ICMS20->addChild('vICMS', $config['vICMS']);
            			break;

            		case '40' :
            		case '41' :
            		case '51' :
            			$ICMS45 = $ICMS->addChild('ICMS45');
            			$ICMS45->addChild('CST', $config['CST']);
            			break;

            		case '60' :
            			$ICMS60 = $ICMS->addChild('ICMS60');

            			$ICMS60->addChild('CST', $config['CST']);
            			$ICMS60->addChild('vBCSTRet', $config['vBCSTRet']);
            			$ICMS60->addChild('vICMSSTRet', $config['vICMSSTRet']);
            			$ICMS60->addChild('pICMSSTRet', $config['pICMSSTRet']);
            			$ICMS60->addChild('vCred', $config['vCred']);
            			break;

            		case '90' :
            			$ICMS90 = $ICMS->addChild('ICMS90');
            			$ICMS90->addChild('CST', $config['CST']);
            			$ICMS90->addChild('pRedBC', $config['pRedBC']);
            			$ICMS90->addChild('vBC', $config['vBC']);
            			$ICMS90->addChild('pICMS', $config['pICMS']);
            			$ICMS90->addChild('vICMS', $config['Vicms']);
            			$ICMS90->addChild('vCred', $config['vCred']);
            			break;

            		case 'SN' :
            			$ICMSSN = $ICMS->addChild('ICMSSN');
            			$ICMSSN->addChild('indSN', 1);
            			break;

            		default: // Default ser\E1 outra UF
            			$ICMSOutraUF = $ICMS->addChild('ICMSOutraUF');

            			$ICMSOutraUF->addChild('CST', '90');
            			$ICMSOutraUF->addChild('pRedBCOutraUF', $config['pRedBCOutraUF']);
            			$ICMSOutraUF->addChild('vBCOutraUF', $config['vBCOutraUF']);
            			$ICMSOutraUF->addChild('pICMSOutraUF', $config['pICMSOutraUF']);
            			$ICMSOutraUF->addChild('vICMSOutraUF', $config['vICMSOutraUF']);
            	}

            	if ( !empty($config['vTotTrib']) ) {
            		$imp->addChild('vTotTrib', $config['vTotTrib']);
            	}

            	if ( !empty($config['infAdFisco']) ) {
            		$imp->addChild('infAdFisco', $config['infAdFisco']);
            	}

            	$this->setXml($xml);
            }

            public function setInfCTeNormValues($config) {
            	$xml = $this->getXml();

            	$infCTeNorm = $xml->infCte->addChild('infCTeNorm');
            	$dInfCarga = $config['infCarga'];

            	$infCarga = $infCTeNorm->addChild('infCarga');

            	if( $this->cleaner( $dInfCarga['vCarga']) != '' ){
            		$infCarga->addChild('vCarga', $dInfCarga['vCarga']);
            	}

            	if ( empty($dInfCarga['proPred']) ){
            		$dInfCarga['proPred'] = 'N/D';
            	}
            	$infCarga->addChild('proPred', $dInfCarga['proPred']);

            	if( $this->cleaner($dInfCarga['xOutCat']) != '') {
            		$infCarga->addChild('xOutCat', $dInfCarga['xOutCat']);
            	}

            	if(count($config['infQ']) > 0) {
            		foreach($config['infQ'] as $dInfQ) {
            			$infQ = $infCarga->addChild('infQ');

            			$infQ->addChild('cUnid', str_pad($dInfQ['cnc_codigo_unidade_medida'], 2, '0', STR_PAD_LEFT)/*'01'*/);
            			$infQ->addChild('tpMed', $dInfQ['cnc_tipo_medida']/*'PESO BRUTO'*/);
            			$infQ->addChild('qCarga', $dInfQ['cnc_valor_componente']/*'12345678911.1154'*/);
            		}
            	}

  
            	$documentos = $config['infDoc'];
            	if ( isset($documentos) && count($documentos) > 0){

            		$infDoc = $infCTeNorm->addChild('infDoc');
            		foreach($documentos as $dInfDoc) {
            			
            			switch($dInfDoc['cnf_tipo']) {
            				case 1 :
            					$infNF = $infDoc->addChild('infNF');
            					$infNF->addChild('nRoma', str_pad($dInfDoc['cnf_numero_romaneio'], 20, STR_PAD_LEFT)/*'12315646156189189111'*/);
            					$infNF->addChild('nPed', str_pad($dInfDoc['cnf_numero_pedido'], 20, STR_PAD_LEFT)/*'12315646156189189111'*/);
            					$infNF->addChild('mod', '01'/*$dInfDoc['cnf_modelo_nota']'04'*/);	//Preencher com:01 - NF Modelo 01/1A e Avulsa;04 - NF de Produtor
            					$infNF->addChild('serie', str_pad($dInfDoc['cnf_serie'], 3, STR_PAD_LEFT)/*'1'*/);

            					$infNF->addChild('nDoc', str_pad($dInfDoc['cnf_numero'], 20, STR_PAD_LEFT)/*'1'*/);

            					$infNF->addChild('dEmi', ($dInfDoc['cnf_data_emissao'] == '---')? $dInfDoc['cnf_data_emissao'] : date('Y-m-d')); /
            					$infNF->addChild('vBC', ($dInfDoc['cnf_valor_base_icms'])? $dInfDoc['cnf_valor_base_icms'] : '0.00'/*'8047.11'*/);
            					$infNF->addChild('vICMS', ($dInfDoc['cnf_total_icms'])? $dInfDoc['cnf_total_icms'] : '0.00'/*'965.65'*/);
            					$infNF->addChild('vBCST', ($dInfDoc['cnf_valor_base_icms_st'])? $dInfDoc['cnf_valor_base_icms_st'] : '0.00'/*'123.00'*/);
            					$infNF->addChild('vST', ($dInfDoc['cnf_valor_icms_st'])? $dInfDoc['cnf_valor_icms_st'] : '0.00'/*'123.00'*/);
            					$infNF->addChild('vProd', ($dInfDoc['cnf_valor_total_produtos'])? $dInfDoc['cnf_valor_total_produtos'] : '0.00'/*'123.00'*/);
            					$infNF->addChild('vNF', ($dInfDoc['cnf_valor_total_nf'])? $dInfDoc['cnf_valor_total_nf'] : '0.00'/*'123.00'*/);
            					$infNF->addChild('nCFOP', ($dInfDoc['cnf_cfop_prodominante'])? $dInfDoc['cnf_cfop_prodominante'] : '5353'/*'5353'*/);

            					if ( !empty($dInfDoc['cnf_peso_total']) ){
            						$infNF->addChild('nPeso', $dInfDoc['cnf_peso_total']);
            					}

            					if ( !empty($dInfDoc['cnf_suframa']) ) {
            						$infNF->addChild('PIN', str_pad($dInfDoc['cnf_suframa'], 9, STR_PAD_LEFT/*'123'*/));
            					}

            					if ( !empty($dInfDoc['cnf_data_prevista_entrega']) && $dInfDoc['cnf_data_prevista_entrega'] != '---' ) { 
            						$infNF->addChild('dPrev', $dInfDoc['cnf_data_prevista_entrega']);
            					}
            					break;
            				case 2 :
            					$infNFe = $infDoc->addChild('infNFe');
            					$infNFe->addChild('chave', $dInfDoc['cnf_eletronica_chave_acesso']);

            					if ( !empty($dInfDoc['cnf_eletronica_suframa']) ){
            						$infNFe->addChild('PIN', str_pad($dInfDoc['cnf_eletronica_suframa'], 9, STR_PAD_LEFT));
            					}

            					if ( !empty($dInfDoc['cnf_eletronica_data_prevista']) && $dInfDoc['cnf_eletronica_data_prevista'] != '---' ){ 
            						$infNFe->addChild('dPrev', $dInfDoc['cnf_eletronica_data_prevista']);
            					}

            					$unidadeTransporteNFe = $dInfDoc['CteInfNotaFiscalUnidadeTransporte'];
            					if(count($unidadeTransporteNFe) > 0) {
            						foreach($unidadeTransporteNFe as $dInfUnidTranspNFe) {
            							$infUnidTranspNFe = $infNFe->addChild('infUnidTransp');

            							$infUnidTranspNFe->addChild('tpUnidTransp', $dInfUnidTranspNFe['cut_tipo_unidade_transportadora']);
            							$infUnidTranspNFe->addChild('idUnidTransp', $dInfUnidTranspNFe['cut_identificacao_unidade_transportadora']);

            							$lacresUnidTranspNFe = $dInfUnidTranspNFe['CteInfNotaFiscalUnidadeTransporteLacre'];

            							if(count($lacresUnidTranspNFe) > 0) {
            								foreach($lacresUnidTranspNFe as $dLacUnidTranspNFe) {
            									$lacUnidTranspNFe = $infUnidTranspNFe->addChild('lacUnidTransp');

            									$lacUnidTranspNFe->addChild('nLacre', $dLacUnidTranspNFe['ctl_numero_lacre']);
            								}
            							}

            							$unidadesDeCargaTransNFe = $dInfUnidTranspNFe['CteInfNotaFiscalUnidadeCarga'];

            							if(count($unidadesDeCargaTransNFe) > 0) {
            								foreach($unidadesDeCargaTransNFe as $dInfUnidCargaTranspNFe) {
            									$infUnidCargaTranspNFe = $infUnidTranspNFe->addChild('infUnidCarga');

            									$infUnidCargaTranspNFe->addChild('tpUnidCarga', $dInfUnidCargaTranspNFe['cuc_tipo_unidade_carga']);
            									$infUnidCargaTranspNFe->addChild('idUnidCarga', $dInfUnidCargaTranspNFe['cuc_identificacao_unidade_carga']);

            									$lacresUnidCargaTranspNFe = $dInfUnidCargaTranspNFe['CteInfNotaFiscalUnidadeCargaLacre'];

            									if(count($lacresUnidCargaTranspNFe) > 0) {
            										foreach($lacresUnidCargaTranspNFe as $dLacUnidCargaTranspNFe) {
            											$lacUnidCargaTranspNFe = $infUnidCargaTranspNFe->addChild('lacUnidCarga');

            											$lacUnidCargaTranspNFe->addChild('nLacre', $dLacUnidCargaTranspNFe['ccl_numero_lacre']);
            										}
            									}

            									$infUnidCargaTranspNFe->addChild('qtdRat', $dInfUnidCargaTranspNFe['cuc_qtd_rateado']);
            								}
            							}
            						}
            					}
            					break;
            			}
            	
            	foreach($config['seg'] as $dSeg) {
            		$seg = $infCTeNorm->addChild('seg');
            		 
            		$seg->addChild('respSeg', $dSeg['cns_responsavel_seguro']/*'4'*/);
            		 
            		if($this->cleaner($dSeg['cns_nome_seguradora'])!="") {
            			$seg->addChild('xSeg', $dSeg['cns_nome_seguradora']/*'Zurich'*/);
            		}

            		if($this->cleaner($dSeg['cns_numero_apolice'])!="") {
            			$seg->addChild('nApol', $dSeg['cns_numero_apolice']);
            		}
            		 
            		if($this->cleaner($dSeg['cns_numero_averbacao'])!="") {
            			$seg->addChild('nAver', str_pad($dSeg['cns_numero_averbacao'], 20, STR_PAD_LEFT));
            		}
            		// Padr\E3o da carga \E9 13,2
            		if($this->cleaner($dSeg['cns_valor_carga_efeito_averbacao'])!="" && $dSeg['cns_valor_carga_efeito_averbacao'] != '000') {
            			$seg->addChild('vCarga', $dSeg['cns_valor_carga_efeito_averbacao']/*'47000.00'*/);
            		}
            	}


            	$infModal = $infCTeNorm->addChild('xs:infModal', $config['infModal']['xs:any']->asXML());
            	$infModal->addAttribute('versaoModal', $config['infModal']['versaoModal']);

            	foreach($config['peri'] as $dPeri) {
            		$peri = $infCTeNorm->addChild('peri');

            		$peri->addChild('nONU', $dPeri['cno_numero_onu']);
            		$peri->addChild('xNomeAE', $dPeri['cno_nome_apropriado_embarque_produto']);
            		$peri->addChild('xClaRisco', $dPeri['cno_classe_subclasse']);
            		$peri->addChild('grEmb', $dPeri['cno_grupo_embarque']);
            		$peri->addChild('qTotProd', $dPeri['cno_quantidade_total_produto']);
            		$peri->addChild('qVolTipo', $dPeri['cno_quantidade_tipo_volume']);
            		$peri->addChild('pontoFulgor', $dPeri['cno_ponto_fulgor']);
            	}

            	// Se existir carros novos \E9 obrigat\F3rio informar os campos abaixo
            	if ( count($config['veicNovos']) > 0 ) {
            		foreach($config['veicNovos'] as $dVeicNovos) {
            			$veicNovos = $infCTeNorm->addChild('veicNovos');

            			$veicNovos->addChild('chassi', $dVeicNovos['cvt_chassi_veiculo']);
            			$veicNovos->addChild('cCor', $dVeicNovos['cvt_cor_veiculo']);
            			$veicNovos->addChild('xCor', $dVeicNovos['cvt_descricao_cor']);
            			$veicNovos->addChild('cMod', $dVeicNovos['cvt_codigo_marca_modelo']);
            			$veicNovos->addChild('vUnit', $dVeicNovos['cvt_valor_unitario_veiculo']);
            			$veicNovos->addChild('vFrete', $dVeicNovos['cvt_frete_unitario']);
            		}
            	}

            	$this->setXml($xml);
            }

            public function save($cte_id) {
            	try {
            		$xml = $this->getXml();

            		$cteXml = CteXmlTable::getInstance()->findOneByCteId($cte_id);
            		 
            		if(!$cteXml instanceof CteXml)
            		$cteXml = new CteXml();
            		 
            		$cteXml->ctx_xml = $xml;
            		$cteXml->cte_id = $cte_id;
            		$cteXml->ctx_qem = 1;
            		 
            		$cteXml->save();

            		return $this;
            	} catch(Exception $e) {
            		exit($e->getMessage());
            	}
            }
          

            private function limpaEspacos($arranjo) {
            	foreach($arranjo as $indice => $valor) {
            		if(!is_array($valor)) {
            			$arranjo[$indice] = trim($valor);
            		}
            	}
            	return $arranjo;
            }

            private function cleaner($str) {
            	$str = trim($str);
            	return $str;
            }

            public function calculaDv($cCT) {
            	// omitted code with 11 lines
            }
             
            public function calculaChaveAcesso($cUF, $AAMM, $CNPJ, $mod, $serie, $nCT, $tpEmis, $cCT) {
		// omitted code with 20 lines
            }
}
```

## Crying, Thinking and Planning

As you could see now we have a class with 1054 lines and our challenge is to transform it in testable code.
As a first step I'd recommend you to cry and as a second step we can start to think in what the code does and how can
we break it down in pieces.

In our code we have a couple of method that can be separated in classes instead of methods because they have its own
behavior for example the method setCompl($config) will add to our XML a bunch of nodes depending on some conditions
in this case is used a switch statement either a couple of if's .

```php
class Compl {
public function setCompl($config) {
            	$xml = $this->getXml();

            	$compl = $xml->infCte->addChild('compl');

            	$confComplPrimeiroBloco = array(
					'xCaracAd', 
					'xCaracSer', 
					'xEmi'
					);

					foreach($confComplPrimeiroBloco as $node) {
						$config[$node] = $this->cleaner($config[$node]);
						if($config[$node]!="")
						$compl->addChild($node, $config[$node]);
					}

					if($config['fluxo']['xOrig'] != "" || $config['fluxo']['pass'] != "") {
						$fluxo = $compl->addChild('fluxo');
					}

					if(!empty($config['fluxo']['xOrig'])) {
						$fluxo->addChild('xOrig', $config['fluxo']['xOrig']);
					}

					if($config['fluxo']['pass'] != "" && count($config['fluxo']['pass']) > 0) {
						foreach($config['fluxo']['pass'] as $pass) {
							$xpass = $fluxo->addChild('pass');

							$nodesPass = array(
						'xPass' => 'cdp_sigla_aeroporto_passagem',
						'xDest' => 'cdp_sigla_aeroporto_destino',
						'xRota' => 'cdp_codigo_rota_entrega'
						);
							
						foreach($nodesPass as $nodePass => $nodePassIndex) {
							$pass[$nodePassIndex] = $this->cleaner($pass[$nodePassIndex]);
							if($pass[$nodePassIndex]!="")
							$xpass->addChild($nodePass, $pass[$nodePassIndex]);
						}
						}
					}

					if(count($config['Entrega'])) {
						$Entrega = $compl->addChild('Entrega');

						$config['Entrega']['tpPer'] = $this->cleaner($config['Entrega']['tpPer']);

						if($config['Entrega']['tpPer']=="")

						switch($config['Entrega']['tpPer']) {
							case '0' :
								$semData = $Entrega->addChild('semData');
								$semData->addChild('tpPer', $config['Entrega']['tpPer']);
								break;
							case '1' :
							case '2' :
							case '3' :
								$comData = $Entrega->addChild('comData');
								$comData->addChild('tpPer', $config['Entrega']['tpPer']);
								$config['Entrega']['dProg'] = $this->cleaner($config['Entrega']['dProg']);

								if($config['Entrega']['dProg']!="")
								$comData->addChild('tpPer', $config['Entrega']['dProg']);
								
								break;
							case '4' :
								$noPeriodo = $Entrega->addChild('noPeriodo');
								$noPeriodo->addChild('tpPer', $config['Entrega']['tpPer']);
								$config['Entrega']['dtIni'] = $this->cleaner($config['Entrega']['dtIni']);
								if($config['Entrega']['dtIni']!="")
								$noPeriodo->addChild('dtIni', $config['Entrega']['dtIni']);
								
								$config['Entrega']['dtFim'] = $this->cleaner($config['Entrega']['dtFim']);
								if($config['Entrega']['dtFim']!="")
								$noPeriodo->addChild('dtFim', $config['Entrega']['dtFim']);
								
								break;
						}

						$config['Entrega']['tpHor'] = $this->cleaner($config['Entrega']['tpHor']);

						switch($config['Entrega']['tpHor']) {
							case '0' :
								$semHora = $Entrega->addChild('semHora');
								$semHora->addChild('tpHor', $config['Entrega']['tpHor']);
								break;
							case '1' :
							case '2' :
							case '3' :
								$comHora = $Entrega->addChild('comHora');
								$comHora->addChild('tpHor', $config['Entrega']['tpHor']);
								$config['Entrega']['hProg'] = $this->cleaner($config['Entrega']['hProg']);
								if($config['Entrega']['hProg']!="")
								$comHora->addChild('tpHor', $config['Entrega']['hProg']);
								break;
							case '4' :
								$noInter = $Entrega->addChild('noInter');
								$noInter->addChild('tpHor', $config['Entrega']['tpHor']);
								$config['Entrega']['hIni'] = $this->cleaner($config['Entrega']['hIni']);
								if($config['Entrega']['hIni']!="")
								$noInter->addChild('hIni', $config['Entrega']['hIni']);
								$config['Entrega']['hFim'] = $this->cleaner($config['Entrega']['hFim']);
								if($config['Entrega']['hFim']!="")
								$noInter->addChild('hFim', $config['Entrega']['hFim']);
								break;
						}
					}

					if ( !empty($config['xObs']) ){
						$compl->addChild('xObs', $config['xObs']);
					}

					if(isset($config['ObsCont']) && count($config['ObsCont']) > 0) {
						foreach($config['ObsCont'] as $ObsCont) {
							$xObsCont = $compl->addChild('ObsCont');

							$ObsCont['coic_identificador'] = $this->cleaner($ObsCont['coic_identificador']);
							if($ObsCont['coic_identificador']!="")
							$xObsCont->addChild('xCampo', $ObsCont['coic_identificador']);
							$ObsCont['coic_obs'] = $this->cleaner($ObsCont['coic_obs']);
							if($ObsCont['coic_obs']!="")
							$xObsCont->addChild('xTexto', $ObsCont['coic_obs']);
						}
					}

					if(isset($config['ObsFisco']) && count($config['ObsFisco']) > 0) {
						foreach($config['ObsFisco'] as $ObsFisco) {
							$xObsFisco = $compl->addChild('ObsFisco');

							$ObsFisco['coif_identificador'] = $this->cleaner($ObsFisco['coif_identificador']);
							if($ObsFisco['coif_identificador']!="")
							$xObsFisco->addChild('xCampo', $ObsFisco['coif_identificador']);
							$ObsFisco['coif_obs'] = $this->cleaner($ObsFisco['coif_obs']);
							if($ObsFisco['coif_obs']!="")
							$xObsFisco->addChild('xTexto', $ObsFisco['coif_obs']);
						}
					}

					$this->setXml($xml);
					//		}
            }

}
```

It is much better now, isn't it? We've got one class with a one responsibility and very tiny just 146 lines although
this class we have just created could be improved as well but it is a subject to other post.
So we got what we need to do and we have a plan already:

1. Analyze the methods
2. Extract and create new classes

Our last step before go to unit test is substitute the source code to use or new class instead of the currently code
let's find where is the **setComple($config)** and switch our code.

```php
public function setIdeValues($config, $Cte) {
//omitted code
}

public function setCompl($config) {
            	$newCode = new Compl();
		$newCode->setCompl($config);
}

public function setEmitValues($config) {
//omitted code
}
```

3. Substitute legacy code to your new code

**Now we should test our code in order to see if its still working**, once we
have this confirmation we can now create our unit tests and repeat the cycle
again. As you start refactoring all the legacy using those steps you'll start
to have your source code with better quality, maintainability  and of course
testable.

## It is hard

It is not easy to restructure all the legacy with new code but the result
is amazing. You can fallow the ideology of baby steps in this refactor as well
so as you change the legacy to the new code you test to see if everything is
the same. The trick here is to be patient and change piece by piece.

Basically I tried to show one single way of do it but in the internet you can
find thousands.

1. Analyze the methods
2. Extract and create new classes
3. Substitute legacy code to your new code
4. Make sure everything is working
5. Create your unit tests
