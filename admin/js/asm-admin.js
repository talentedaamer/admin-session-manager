(function( $ ) {
	'use strict';

	/**
	 * get current user id
	 */
	var current_user_id = asm_params.current_user_id;

	console.log(">> asm admin >>", asm_params );

	$(document).ready(function() {
        var initial_users_table = asm_display_users(asm_params.asm_active_users)
		$('#asm-users').html(initial_users_table);
    });
	
	/**
	 * Send users check to the data array of heartbeat
	 * it will be used in heartbeat_received function
	 */
	$(document).on('heartbeat-send', function(e, data) {
		data.asm_active_user_id = current_user_id
        data.asm_is_user_active = true;
	});

	/**
	 * heartbeat response function
	 */
	$(document).on('heartbeat-tick', function(e, data) {
		console.log(">> tick >>", data );
		var display_users_table = asm_display_users(data.asm_active_users)
		$('#asm-users').html(display_users_table);
	});

	function asm_display_users(data) {
        var userList = '';
        if (data) {
            userList += '<table class="striped">';
            $.each(data, function(index, user) {
				
                var status_html = '';
                if ( user.time_ago && user.time_ago.class === 'just-now' ) {
                    status_html = '<span class="asm-status asm-green"></span>';
                }
				
				var time_ago_html = '';
				if ( user.time_ago && user.time_ago.class ) {
					time_ago_html = '<div class="asm-online-status">';
						time_ago_html += '<strong class="'+ user.time_ago.class +'">Online: '+ user.time_ago.value +'</strong>';
					time_ago_html += '</div>';
				}

				userList += '<tr>';
					userList += '<td>';
						userList += '<div class="asm-wrap">';
							userList += '<div class="asm-actions">';
								userList += '<div class="asm-buttons">';
									// edit user profile link
									userList += '<a class="asm-button button" href="'+ user.edit_link +'">';
										userList += '<span class="dashicons dashicons-visibility"></span>';
									userList += '</a>';
									// clear session link
									userList += '<a class="asm-button button reset" href="'+ user.end_user_session_link +'">';
										userList += '<span class="dashicons dashicons-trash"></span>';
									userList += '</a>';
								userList += '</div>';
							userList += '</div>';
							
							userList += '<div class="asm-avatar">';
								userList += status_html;
								userList += user.author_avatar;
							userList += '</div>';

							userList += '<div class="asm-info">';
								userList += '<div class="asm-header">';
									userList += time_ago_html;
									userList += '<div class="asm-info-wrap">';
										userList += '<strong class="asm-name">'+ user.author +'</strong>';
										userList += '<span class="asm-seperator"> / </span>';
										userList += '<strong class="asm-date">'+ user.date_time +'</strong>';
									userList += '</div>';
								userList += '</div>';
								userList += '<span class="asm-user-email">'+ user.author_email +'</span>';
							userList += '</div>';

						userList += '</div>';
					userList += '</tr>';
				userList += '</td>';
            });
            userList += '</table>';
        }
        
        return userList
    }
})( jQuery );
