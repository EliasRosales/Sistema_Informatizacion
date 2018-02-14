var url = "http://localhost:8000/api/"
	

$(document).ready(function() {
    $('html').niceScroll();
    $(document).foundation();
    if("Id" in localStorage) {
        swal(
            'Bienvenido',
            localStorage.getItem("Name") + ' ' + localStorage.getItem("LastName"),
            'success'
        );
        cargar_combos();
        llenar_departamentos();
        llenar_remitentes();
        llenar_oficios();
        llenar_estadisticas();
    }else{
        window.location.href = "Login/login.html";
    }

});

function cargar_combos(){
	// LLenado del select de departamentos
	$('[id*=comDep]').html('<option value="volvo">Departamento</option>');
	$.get(url + "get_departamentos/", function(data) {
		$.each(data.departamentos, function(index, val) {
			$('[id*=comDep]').append('<option value="' + val['id'] + '">' + val['nombre'] + '</option>');
		});
	});
	// LLenado del select de remitentes
	$('[id*=comRem]').html('<option value="volvo">Remitente</option>');
	$.get(url + "get_remitentes/", function(data) {
		$.each(data.remitentes, function(index, val) {
			$('[id*=comRem]').append('<option value="' + val['id'] + '">' + val['nombre'] + '</option>');
		});
	});
}

/* -------------------- Funcion de botones acciones -------------------- */

// Seccion Inicio ---------------------------------------------------

// Seccion Oficios ---------------------------------------------------

$('#btn_ofi_filtrar').click(function(event) {
    var fecha_inicio = $('#ofi_fecha_inicio').val();
    var fecha_fin = $('#ofi_fecha_fin').val();
    var dep = $('#comDepOficio').val();
    var rem = $('#comRemOficio').val();
    if((fecha_inicio != '' && fecha_fin != '') && (dep != 'volvo' && rem != 'volvo')){
        $('#of_list_content').html('')
        $.post(url + 'get_oficios_filtro/', {
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
            departamento_id: dep,
            remitente_id: rem

        }, function(data, textStatus, xhr) {
            $.each(data.oficios, function(index, val) {
                $('#of_list_content').append('<div class="list_element of_list_element" id="' + val['id'] + '">' +
                    '<p class="oficioFolio"><strong>Folio:</strong> ' + val['folio'] + '</p>' +
                    '<p class="oficioFecha"><strong>Fecha:</strong> ' + val['fecha_oficio'] + '</p>' +
                    '<p class="oficioRemitente"><strong>Remitente:</strong> ' + val['remitente'] + '</p>' +
                    '<p class="oficioRemitente"><strong>Departamento:</strong> ' + val['departamentos'] + '</p>' +
                    '</div>');
            });
            $('.of_list_element').click(function(event) {
                $('.of_list_element').css('background', '#fff');
                $(this).css('background', '#d9d9d9');
                var id = $(this).attr('id');
                $.get(url + 'get_oficios_by_id/' + id + '/' , function(data) {
                    if(data.response == 1){
                        $('#of_folio').val(data.oficio.folio);
                        $('#of_fecha').val(data.oficio.fecha_oficio);
                        $('.comDep').val(data.oficio.departamentos);
                        $('.comRem').val(data.oficio.remitente);
                        $('.of_desc').val(data.oficio.descripcion);
                        $('.of_obs').val(data.oficio.observaciones);
                        $('#content_of').attr('pk', id);
                    }else{
                        msg_error('Ocurrio un error, intente nuevamente');
                    }
                });
            });
        });

    }else if ((fecha_inicio != '' && fecha_fin != '') && (dep == 'volvo' && rem == 'volvo')){
            $('#of_list_content').html('')
            $.post(url + 'get_oficios_filtro/', {
                fecha_inicio: fecha_inicio,
                fecha_fin: fecha_fin,
                departamento_id: "",
                remitente_id: ""

            }, function(data, textStatus, xhr) {
                $.each(data.oficios, function(index, val) {
                    $('#of_list_content').append('<div class="list_element of_list_element" id="' + val['id'] + '">' +
                        '<p class="oficioFolio"><strong>Folio:</strong> ' + val['folio'] + '</p>' +
                        '<p class="oficioFecha"><strong>Fecha:</strong> ' + val['fecha_oficio'] + '</p>' +
                        '<p class="oficioRemitente"><strong>Remitente:</strong> ' + val['remitente'] + '</p>' +
                        '<p class="oficioRemitente"><strong>Departamento:</strong> ' + val['departamentos'] + '</p>' +
                        '</div>');
                });
                $('.of_list_element').click(function(event) {
                    $('.of_list_element').css('background', '#fff');
                    $(this).css('background', '#d9d9d9');
                    var id = $(this).attr('id');
                    $.get(url + 'get_oficios_by_id/' + id + '/' , function(data) {
                        if(data.response == 1){
                            $('#of_folio').val(data.oficio.folio);
                            $('#of_fecha').val(data.oficio.fecha_oficio);
                            $('.comDep').val(data.oficio.departamentos);
                            $('.comRem').val(data.oficio.remitente);
                            $('.of_desc').val(data.oficio.descripcion);
                            $('.of_obs').val(data.oficio.observaciones);
                            $('#content_of').attr('pk', id);
                        }else{
                            msg_error('Ocurrio un error, intente nuevamente');
                        }
                    });
                });
            });
        }else if ((fecha_inicio != '' && fecha_fin != '') && (dep != 'volvo' && rem == 'volvo')){
                $('#of_list_content').html('')
                $.post(url + 'get_oficios_filtro/', {
                    fecha_inicio: fecha_inicio,
                    fecha_fin: fecha_fin,
                    departamento_id: dep,
                    remitente_id: ""

                }, function(data, textStatus, xhr) {
                    $.each(data.oficios, function(index, val) {
                        $('#of_list_content').append('<div class="list_element of_list_element" id="' + val['id'] + '">' +
                            '<p class="oficioFolio"><strong>Folio:</strong> ' + val['folio'] + '</p>' +
                            '<p class="oficioFecha"><strong>Fecha:</strong> ' + val['fecha_oficio'] + '</p>' +
                            '<p class="oficioRemitente"><strong>Remitente:</strong> ' + val['remitente'] + '</p>' +
                            '<p class="oficioRemitente"><strong>Departamento:</strong> ' + val['departamentos'] + '</p>' +
                            '</div>');
                    });
                    $('.of_list_element').click(function(event) {
                        $('.of_list_element').css('background', '#fff');
                        $(this).css('background', '#d9d9d9');
                        var id = $(this).attr('id');
                        $.get(url + 'get_oficios_by_id/' + id + '/' , function(data) {
                            if(data.response == 1){
                                $('#of_folio').val(data.oficio.folio);
                                $('#of_fecha').val(data.oficio.fecha_oficio);
                                $('.comDep').val(data.oficio.departamentos);
                                $('.comRem').val(data.oficio.remitente);
                                $('.of_desc').val(data.oficio.descripcion);
                                $('.of_obs').val(data.oficio.observaciones);
                                $('#content_of').attr('pk', id);
                            }else{
                                msg_error('Ocurrio un error, intente nuevamente');
                            }
                        });
                    });
                });
                }else if ((fecha_inicio == '' && fecha_fin == '') && (dep != 'volvo' && rem == 'volvo')){
                            $('#of_list_content').html('')
                            $.post(url + 'get_oficios_filtro/', {
                                fecha_inicio: "",
                                fecha_fin: "",
                                departamento_id: dep,
                                remitente_id: ""

                            }, function(data, textStatus, xhr) {
                                $.each(data.oficios, function(index, val) {
                                    $('#of_list_content').append('<div class="list_element of_list_element" id="' + val['id'] + '">' +
                                        '<p class="oficioFolio"><strong>Folio:</strong> ' + val['folio'] + '</p>' +
                                        '<p class="oficioFecha"><strong>Fecha:</strong> ' + val['fecha_oficio'] + '</p>' +
                                        '<p class="oficioRemitente"><strong>Remitente:</strong> ' + val['remitente'] + '</p>' +
                                        '<p class="oficioRemitente"><strong>Departamento:</strong> ' + val['departamentos'] + '</p>' +
                                        '</div>');
                                });
                                $('.of_list_element').click(function(event) {
                                    $('.of_list_element').css('background', '#fff');
                                    $(this).css('background', '#d9d9d9');
                                    var id = $(this).attr('id');
                                    $.get(url + 'get_oficios_by_id/' + id + '/' , function(data) {
                                        if(data.response == 1){
                                            $('#of_folio').val(data.oficio.folio);
                                            $('#of_fecha').val(data.oficio.fecha_oficio);
                                            $('.comDep').val(data.oficio.departamentos);
                                            $('.comRem').val(data.oficio.remitente);
                                            $('.of_desc').val(data.oficio.descripcion);
                                            $('.of_obs').val(data.oficio.observaciones);
                                            $('#content_of').attr('pk', id);
                                        }else{
                                            msg_error('Ocurrio un error, intente nuevamente');
                                        }
                                    });
                                });
                            });
                        }else if ((fecha_inicio != '' && fecha_fin != '') && (dep == 'volvo' && rem != 'volvo')){
                                $('#of_list_content').html('')
                                $.post(url + 'get_oficios_filtro/', {
                                    fecha_inicio: fecha_inicio,
                                    fecha_fin: fecha_fin,
                                    departamento_id: "",
                                    remitente_id: rem

                                }, function(data, textStatus, xhr) {
                                    $.each(data.oficios, function(index, val) {
                                        $('#of_list_content').append('<div class="list_element of_list_element" id="' + val['id'] + '">' +
                                            '<p class="oficioFolio"><strong>Folio:</strong> ' + val['folio'] + '</p>' +
                                            '<p class="oficioFecha"><strong>Fecha:</strong> ' + val['fecha_oficio'] + '</p>' +
                                            '<p class="oficioRemitente"><strong>Remitente:</strong> ' + val['remitente'] + '</p>' +
                                            '<p class="oficioRemitente"><strong>Departamento:</strong> ' + val['departamentos'] + '</p>' +
                                            '</div>');
                                    });
                                    $('.of_list_element').click(function(event) {
                                        $('.of_list_element').css('background', '#fff');
                                        $(this).css('background', '#d9d9d9');
                                        var id = $(this).attr('id');
                                        $.get(url + 'get_oficios_by_id/' + id + '/' , function(data) {
                                            if(data.response == 1){
                                                $('#of_folio').val(data.oficio.folio);
                                                $('#of_fecha').val(data.oficio.fecha_oficio);
                                                $('.comDep').val(data.oficio.departamentos);
                                                $('.comRem').val(data.oficio.remitente);
                                                $('.of_desc').val(data.oficio.descripcion);
                                                $('.of_obs').val(data.oficio.observaciones);
                                                $('#content_of').attr('pk', id);
                                            }else{
                                                msg_error('Ocurrio un error, intente nuevamente');
                                            }
                                        });
                                    });
                                });
                            }else if ((fecha_inicio == '' && fecha_fin == '') && (dep == 'volvo' && rem != 'volvo')){
                                    $('#of_list_content').html('')
                                    $.post(url + 'get_oficios_filtro/', {
                                        fecha_inicio: "",
                                        fecha_fin: "",
                                        departamento_id: "",
                                        remitente_id: rem

                                    }, function(data, textStatus, xhr) {
                                        $.each(data.oficios, function(index, val) {
                                            $('#of_list_content').append('<div class="list_element of_list_element" id="' + val['id'] + '">' +
                                                '<p class="oficioFolio"><strong>Folio:</strong> ' + val['folio'] + '</p>' +
                                                '<p class="oficioFecha"><strong>Fecha:</strong> ' + val['fecha_oficio'] + '</p>' +
                                                '<p class="oficioRemitente"><strong>Remitente:</strong> ' + val['remitente'] + '</p>' +
                                                '<p class="oficioRemitente"><strong>Departamento:</strong> ' + val['departamentos'] + '</p>' +
                                                '</div>');
                                        });
                                        $('.of_list_element').click(function(event) {
                                            $('.of_list_element').css('background', '#fff');
                                            $(this).css('background', '#d9d9d9');
                                            var id = $(this).attr('id');
                                            $.get(url + 'get_oficios_by_id/' + id + '/' , function(data) {
                                                if(data.response == 1){
                                                    $('#of_folio').val(data.oficio.folio);
                                                    $('#of_fecha').val(data.oficio.fecha_oficio);
                                                    $('.comDep').val(data.oficio.departamentos);
                                                    $('.comRem').val(data.oficio.remitente);
                                                    $('.of_desc').val(data.oficio.descripcion);
                                                    $('.of_obs').val(data.oficio.observaciones);
                                                    $('#content_of').attr('pk', id);
                                                }else{
                                                    msg_error('Ocurrio un error, intente nuevamente');
                                                }
                                            });
                                        });
                                    });
                                }else if ((fecha_inicio == '' && fecha_fin == '') && (dep != 'volvo' && rem != 'volvo')){
                                        $('#of_list_content').html('')
                                        $.post(url + 'get_oficios_filtro/', {
                                            fecha_inicio: "",
                                            fecha_fin: "",
                                            departamento_id: dep,
                                            remitente_id: rem

                                        }, function(data, textStatus, xhr) {
                                            $.each(data.oficios, function(index, val) {
                                                $('#of_list_content').append('<div class="list_element of_list_element" id="' + val['id'] + '">' +
                                                    '<p class="oficioFolio"><strong>Folio:</strong> ' + val['folio'] + '</p>' +
                                                    '<p class="oficioFecha"><strong>Fecha:</strong> ' + val['fecha_oficio'] + '</p>' +
                                                    '<p class="oficioRemitente"><strong>Remitente:</strong> ' + val['remitente'] + '</p>' +
                                                    '<p class="oficioRemitente"><strong>Departamento:</strong> ' + val['departamentos'] + '</p>' +
                                                    '</div>');
                                            });
                                            $('.of_list_element').click(function(event) {
                                                $('.of_list_element').css('background', '#fff');
                                                $(this).css('background', '#d9d9d9');
                                                var id = $(this).attr('id');
                                                $.get(url + 'get_oficios_by_id/' + id + '/' , function(data) {
                                                    if(data.response == 1){
                                                        $('#of_folio').val(data.oficio.folio);
                                                        $('#of_fecha').val(data.oficio.fecha_oficio);
                                                        $('.comDep').val(data.oficio.departamentos);
                                                        $('.comRem').val(data.oficio.remitente);
                                                        $('.of_desc').val(data.oficio.descripcion);
                                                        $('.of_obs').val(data.oficio.observaciones);
                                                        $('#content_of').attr('pk', id);
                                                    }else{
                                                        msg_error('Ocurrio un error, intente nuevamente');
                                                    }
                                                });
                                            });
                                        });
                                    }else if((fecha_inicio == '' && fecha_fin == '') && (dep == 'volvo' && rem == 'volvo')){
                                            llenar_oficios();
                                            }


});

$('#btn_inicio_nuevo').click(function(event) {
	var folio = $('#ini_folio').val();
	var fecha = $('#ini_fecha').val();
	var dep = $('#comDep').val();
	var rem = $('#comRem').val();
	var desc = $('.ini_desc').val();
	var obs = $('.ini_obs').val();
	if(folio != '' && fecha != '' && dep != 'volvo' && rem != 'volvo' && desc != ''){
		$.post(url + 'set_oficio/', {
			fecha_oficio: fecha,
			descripcion: desc,
			folio: folio,
			observaciones: obs,
			departamento_id: dep,
			remitente_id: rem,
		}, function(data, textStatus, xhr) {
			if(data.response == 1){
				msg_correcto('Se registro correctamente el oficio');
				$('#ini_folio').val('');
				$('#ini_fecha').val('');
				$('#comDep').val('');
				$('#comRem').val('');
				$('.ini_desc').val('');
				$('.ini_obs').val('');
				llenar_oficios();
				llenar_estadisticas();
			}else{
				msg_error('Ocurrio un error, intente nuevamente');
			}
		});
	}else{
		msg_advertencia('Para poder agregar un nuevo oficio, es necesario llenar todos los campos a excepcion de observaciones');
	}
});


$('#btn_of_editar').click(function(event) {
    var id = $('#content_of').attr('pk');
    var folio = $('#of_folio').val();
    var fecha = $('#of_fecha').val();
    var dep = $('.comDep').val();
    var rem = $('.comRem').val();
    var desc = $('.of_desc').val();
    var obs = $('.of_obs').val();
    if(id != undefined){
        if(folio != '' && fecha != '' && dep != 'volvo' && rem != 'volvo' && desc != ''){
            $.post(url + 'update_oficio/', {
                oficio_id: id,
                fecha_oficio: fecha,
                descripcion: desc,
                folio: folio,
                observaciones: obs,
                departamento_id: dep,
                remitente_id: rem,
            }, function(data, textStatus, xhr) {
                if(data.response == 1){
                    msg_correcto('Se actualizo correctamente el oficio');
                    $('#of_folio').val('');
                    $('#of_fecha').val('');
                    $('.comDep').val('volvo');
                    $('.comRem').val('volvo');
                    $('.of_desc').val('');
                    $('.of_obs').val('');
                    $('#content_of').removeAttr('pk');
                    llenar_oficios();
                    llenar_estadisticas();
                }else{
                    msg_error('Ocurrio un error, intente nuevamente');
                }
            });
        }else{
            msg_advertencia('Para poder agregar un nuevo oficio, es necesario llenar todos los campos a excepcion de observaciones');
        }
    }else{
        msg_advertencia('Para poder editar primero debes seleccionar un oficio');
    }
});

$('#btn_of_eliminar').click(function(event) {
	var id = $('#content_of').attr('pk');
	if (id != undefined){
		swal({
		  title: 'Estas seguro?',
		  text: "Se eliminara completamente el oficio",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Si, eliminar',
		  cancelButtonText: 'No, cancelar',
		}).then((result) => {
  			if (result.value) {
			    $.post(url + 'delete_oficio/', {oficio_id: id}, function(data, textStatus, xhr) {
					if(data.response == 1){
						msg_correcto('Se elimino correctamente el oficio');
						$('#of_folio').val('');
						$('#of_fecha').val('');
						$('.comDep').val('volvo');
						$('.comRem').val('volvo');
						$('.of_desc').val('');
						$('.of_obs').val('');
						$('#content_of').removeAttr('pk');
						llenar_oficios();
						llenar_estadisticas();
					}else{
						msg_error('Ocurrio un error, intente nuevamente');
					}
				});
			}else if (result.dismiss === 'cancel') {
			    swal(
			      'Cancelado',
			      'No se borrara el oficio',
			      'error'
			    );
			}
		});
	}else{
		msg_advertencia('Para poder eliminar primero debes seleccionar un oficio');
	}
});

// Seccion Departamento ---------------------------------------------------

$('#btn_dep_nuevo').click(function(event) {
	var nombre = $('#inp_dep_nombre').val();
	var responsable = $('#inp_dep_responsable').val();
	if(nombre != '' && responsable != ''){
		$.post(url + 'set_departamento/', {nombre: nombre, responsable: responsable}, function(data, textStatus, xhr) {
			if(data.response == 1){
				msg_correcto('Se registro correctamente el departamento');
				$('#inp_dep_nombre').val('');
				$('#inp_dep_responsable').val('');
				cargar_combos();
				llenar_departamentos();
				llenar_estadisticas();
			}else{
				msg_error('Ocurrio un error, intente nuevamente');
			}
		});
	}else{
		msg_advertencia('Para poder agregar un nuevo departamento, es necesario llenar todos los campos');
	}
});

$('#btn_dep_editar').click(function(event) {
	var id = $('#content_dep').attr('pk');
	var nombre = $('#inp_dep_ed_nombre').val();
	var responsable = $('#inp_dep_ed_responsable').val();
	if (id != undefined){
		$.post(url + 'update_departamento/', {departamento_id: id, nombre: nombre, responsable: responsable}, function(data, textStatus, xhr) {
			if(data.response == 1){
				msg_correcto('Se actualizo correctamente el departamento');
				$('#inp_dep_ed_nombre').val('');
				$('#inp_dep_ed_responsable').val('');
				$('#content_dep').removeAttr('pk');
				cargar_combos();
				llenar_departamentos();
				llenar_estadisticas();
			}else{
				msg_error('Ocurrio un error, intente nuevamente');
			}
		});
	}else{
		msg_advertencia('Para poder editar primero debes seleccionar un departamento');
	}
});

$('#btn_dep_eliminar').click(function(event) {
	var id = $('#content_dep').attr('pk');
	if (id != undefined){
		swal({
		  title: 'Estas seguro?',
		  text: "Se eliminara completamente el departamento",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Si, eliminar',
		  cancelButtonText: 'No, cancelar',
		}).then((result) => {
  			if (result.value) {
			    $.post(url + 'delete_departamento/', {departamento_id: id}, function(data, textStatus, xhr) {
					if(data.response == 1){
						msg_correcto('Se elimino correctamente el departamento');
						$('#inp_dep_ed_nombre').val('');
						$('#inp_dep_ed_responsable').val('');
						$('#content_dep').removeAttr('pk');
						cargar_combos();
						llenar_departamentos();
						llenar_estadisticas();
					}else{
						msg_error('Ocurrio un error, intente nuevamente');
					}
				});
			}else if (result.dismiss === 'cancel') {
			    swal(
			      'Cancelado',
			      'No se borrara el departamento',
			      'error'
			    );
			}
		});
	}else{
		msg_advertencia('Para poder eliminar primero debes seleccionar un departamento');
	}
});

// Seccion Remitentes ---------------------------------------------------

$('#btn_rem_nuevo').click(function(event) {
	var nombre = $('#inp_rem_nombre').val();
	var responsable = $('#inp_rem_responsable').val();
	if(nombre != '' && responsable != ''){
		$.post(url + 'set_remitente/', {nombre: nombre, responsable: responsable}, function(data, textStatus, xhr) {
			if(data.response == 1){
				msg_correcto('Se registro correctamente el remitente');
				$('#inp_rem_nombre').val('');
				$('#inp_rem_responsable').val('');
				cargar_combos();
				llenar_remitentes();
				llenar_estadisticas();
			}else{
				msg_error('Ocurrio un error, intente nuevamente');
			}
		});
	}else{
		msg_advertencia('Para poder agregar un nuevo remitente, es necesario llenar todos los campos');
	}
});

$('#btn_rem_editar').click(function(event) {
	var id = $('#content_rem').attr('pk');
	var nombre = $('#inp_rem_ed_nombre').val();
	var responsable = $('#inp_rem_ed_responsable').val();
	if (id != undefined){
		$.post(url + 'update_remitente/', {remitente_id: id, nombre: nombre, responsable: responsable}, function(data, textStatus, xhr) {
			if(data.response == 1){
				msg_correcto('Se actualizo correctamente el remitente');
				$('#inp_rem_ed_nombre').val('');
				$('#inp_rem_ed_responsable').val('');
				$('#content_rem').removeAttr('pk');
				cargar_combos();
				llenar_remitentes();
				llenar_estadisticas();
			}else{
				msg_error('Ocurrio un error, intente nuevamente');
			}
		});
	}else{
		msg_advertencia('Para poder editar primero debes seleccionar un remitente');
	}
});

$('#btn_rem_eliminar').click(function(event) {
	var id = $('#content_rem').attr('pk');
	if (id != undefined){
		swal({
		  title: 'Estas seguro?',
		  text: "Se eliminara completamente el remitente",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Si, eliminar',
		  cancelButtonText: 'No, cancelar',
		}).then((result) => {
  			if (result.value) {
			    $.post(url + 'delete_remitente/', {remitente_id: id}, function(data, textStatus, xhr) {
			    	console.log(data);
					if(data.response == 1){
						msg_correcto('Se elimino correctamente el remitente');
						$('#inp_rem_ed_nombre').val('');
						$('#inp_rem_ed_responsable').val('');
						$('#content_rem').removeAttr('pk');
						cargar_combos();
						llenar_remitentes();
						llenar_estadisticas();
					}else{
						msg_error('Ocurrio un error, intente nuevamente');
					}
				});
			}else if (result.dismiss === 'cancel') {
			    swal(
			      'Cancelado',
			      'No se borrara el remitente',
			      'error'
			    );
			}
		});
	}else{
		msg_advertencia('Para poder eliminar primero debes seleccionar un departamento');
	}
});

// Seccion Estadisticas ---------------------------------------------------

$('#btn_est_filtrar').click(function(event) {
	var fecha_inicio = $('#est_fecha_inicio').val();
	var fecha_fin = $('#est_fecha_fin').val();
	if(fecha_inicio != '' && fecha_fin != ''){
		$('#est_dep_list_content').html('')
		$('#est_rem_list_content').html('')
		$.post(url + 'get_estadistics_filtro/', {
			fecha_inicio: fecha_inicio, 
			fecha_fin: fecha_fin
		}, function(data, textStatus, xhr) {
			$('#est_total_folios').html('Totalde folios: ' + data.oficios_total);
			$.each(data.departamentos_total, function(index, val) {
				$('#est_dep_list_content').append('<div class="list_element">' + 
					'<p class="oficioRemitente"><strong>Departamento:</strong> ' + val['departamento'] + '</p>' +
					'<p class="oficioRemitente"><strong>Cantidad:</strong> ' + val['numero_oficios'] + '</p>' +
				'</div>');
			});
			$.each(data.remitentes_total, function(index, val) {
				$('#est_rem_list_content').append('<div class="list_element">' + 
					'<p class="oficioRemitente"><strong>Departamento:</strong> ' + val['remitente'] + '</p>' +
					'<p class="oficioRemitente"><strong>Cantidad:</strong> ' + val['numero_oficios'] + '</p>' +
				'</div>');
			});
		});
	}else{
		msg_advertencia('Para poder filtrar primero debes seleccionar las dos fechas del rango');
	}

});

/* -------------------- Llenandor de listas -------------------- */

function llenar_departamentos(){
	$('#dep_list_content').html('');
	$.get(url + "get_departamentos/", function(data) {
		$.each(data.departamentos, function(index, val) {
			$('#dep_list_content').append('<div class="list_element dep_list_element" id="' + val['id'] + '">' + 
					'<p class="oficioRemitente"><strong>Nombre:</strong> ' + val['nombre'] + '</p>' +
					'<p class="oficioRemitente"><strong>Encargado:</strong> ' + val['responsable'] + '</p>' +
				'</div>');
		});

		$('.dep_list_element').click(function(event) {
			$('.dep_list_element').css('background', '#fff');
			$(this).css('background', '#d9d9d9');
			var id = $(this).attr('id');
			$.get(url + 'get_departamentos_by_id/' + id + '/' , function(data) {
				if(data.response == 1){
					$('#inp_dep_ed_nombre').val(data.departamento.nombre);
					$('#inp_dep_ed_responsable').val(data.departamento.responsable);
					$('#content_dep').attr('pk', id);
				}else{
					msg_error('Ocurrio un error, intente nuevamente');
				}
			});
		});
	});
}

function llenar_remitentes(){
	$('#rem_list_content').html('');
	$.get(url + "get_remitentes/", function(data) {
		$.each(data.remitentes, function(index, val) {
			$('#rem_list_content').append('<div class="list_element rem_list_element" id="' + val['id'] + '">' + 
					'<p class="oficioRemitente"><strong>Nombre:</strong> ' + val['nombre'] + '</p>' +
					'<p class="oficioRemitente"><strong>Encargado:</strong> ' + val['responsable'] + '</p>' +
				'</div>');
		});

		$('.rem_list_element').click(function(event) {
			$('.rem_list_element').css('background', '#fff');
			$(this).css('background', '#d9d9d9');
			var id = $(this).attr('id');
			$.get(url + 'get_remitentes_by_id/' + id + '/' , function(data) {
				if(data.response == 1){
					$('#inp_rem_ed_nombre').val(data.remitente.nombre);
					$('#inp_rem_ed_responsable').val(data.remitente.responsable);
					$('#content_rem').attr('pk', id);
				}else{
					msg_error('Ocurrio un error, intente nuevamente');
				}
			});
		});
	});
}

function llenar_oficios(){
	$('#of_list_content').html('');
	$.get(url + "get_oficios/", function(data) {
		$.each(data.oficios, function(index, val) {
			$('#of_list_content').append('<div class="list_element of_list_element" id="' + val['id'] + '">' + 
					'<p class="oficioFolio"><strong>Folio:</strong> ' + val['folio'] + '</p>' +
					'<p class="oficioFecha"><strong>Fecha:</strong> ' + val['fecha_oficio'] + '</p>' +
					'<p class="oficioRemitente"><strong>Remitente:</strong> ' + val['remitente'] + '</p>' +
					'<p class="oficioRemitente"><strong>Departamento:</strong> ' + val['departamentos'] + '</p>' +
				'</div>');
		});

		/*$('.of_list_element').hover(function(event) {
			$(this).css('background', '#d9d9d9');
		}, function(event) {
			$(this).css('background', '#fff');
		});*/
		

		$('.of_list_element').click(function(event) {
			$('.of_list_element').css('background', '#fff');
			$(this).css('background', '#d9d9d9');
			var id = $(this).attr('id');
			$.get(url + 'get_oficios_by_id/' + id + '/' , function(data) {
				if(data.response == 1){
					$('#of_folio').val(data.oficio.folio);
					$('#of_fecha').val(data.oficio.fecha_oficio);
					$('.comDep').val(data.oficio.departamentos);
					$('.comRem').val(data.oficio.remitente);
					$('.of_desc').val(data.oficio.descripcion);
					$('.of_obs').val(data.oficio.observaciones);
					$('#content_of').attr('pk', id);
				}else{
					msg_error('Ocurrio un error, intente nuevamente');
				}
			});
		});
	});
}

function llenar_estadisticas(){
	$('#est_dep_list_content').html('')
	$('#est_rem_list_content').html('')
	$.get(url + 'get_estadistics/', function(data) {
		$('#est_total_folios').html('Totalde folios: ' + data.oficios_total);
		$.each(data.departamentos_total, function(index, val) {
			$('#est_dep_list_content').append('<div class="list_element">' + 
				'<p class="oficioRemitente"><strong>Departamento:</strong> ' + val['departamento'] + '</p>' +
				'<p class="oficioRemitente"><strong>Cantidad:</strong> ' + val['numero_oficios'] + '</p>' +
			'</div>');
		});
		$.each(data.remitentes_total, function(index, val) {
			$('#est_rem_list_content').append('<div class="list_element">' + 
				'<p class="oficioRemitente"><strong>Departamento:</strong> ' + val['remitente'] + '</p>' +
				'<p class="oficioRemitente"><strong>Cantidad:</strong> ' + val['numero_oficios'] + '</p>' +
			'</div>');
		});
	});
}

/* -------------------- Funcion de botones header -------------------- */

$('#btn_inicio').click(function(event) {
	$('.inicio').show();
	$('.oficios').hide();
	$('.departamentos').hide();
	$('.remitentes').hide();
	$('.estadisticas').hide();
});

$('#btn_oficios').click(function(event) {
	$('.inicio').hide();
	$('.oficios').show();
	$('.departamentos').hide();
	$('.remitentes').hide();
	$('.estadisticas').hide();
});

$('#btn_departamentos').click(function(event) {
	$('.inicio').hide();
	$('.oficios').hide();
	$('.departamentos').show();
	$('.remitentes').hide();
	$('.estadisticas').hide();
});

$('#btn_remitentes').click(function(event) {
	$('.inicio').hide();
	$('.oficios').hide();
	$('.departamentos').hide();
	$('.remitentes').show();
	$('.estadisticas').hide();
});

$('#btn_estadisticas').click(function(event) {
	$('.inicio').hide();
	$('.oficios').hide();
	$('.departamentos').hide();
	$('.remitentes').hide();
	$('.estadisticas').show();
});

/* -------------------- mensajes -------------------- */

function msg_correcto(msg){
	swal(
	  'Correcto!',
	  msg,
	  'success'
	);
}

function msg_error(msg){
	swal(
	  'Oops...',
	  msg,
	  'error'
	);
}

function msg_advertencia(msg){
	swal(
	  'Advertencia',
	  msg,
	  'warning'
	)
}







