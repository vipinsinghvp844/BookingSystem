<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'vp_ecommerce_2' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '9fR!Z)_u(2&pO1?V@P0x@45d!WmLFtC^ L%3=)whj?`0M?5h?F0SMspD._|gcQO,' );
define( 'SECURE_AUTH_KEY',  'NLc L:y<#`CD&=(6h)VTzM~!>Oqybosk~EhsN,?fJAda).InW*7WjinzruV<[X:i' );
define( 'LOGGED_IN_KEY',    '0~7=l^H`o+yD!_1,JqH4O83H#8zY[[&=5kmF+28Bh{3yQ[8!pwR]V.jU.ID.K,r!' );
define( 'NONCE_KEY',        '[pN^+pK#UXqytN4v,FA)CX(oOFBCM{Z5$qmepYR$&2BvI.2KhE+*;GIMyzW4x5P8' );
define( 'AUTH_SALT',        '}D:Yl+.6(8}5+oXhAXKqEnOgrba#_a*pw)6>9*f4JF:K!CRVUX>AR)E]*dvd_T? ' );
define( 'SECURE_AUTH_SALT', 'oU{uu1hg0[Xz2nybupv,YUb R:x0A|j}~uv$/GS|L9J:-]WPS-vxs[Li&*4U)9US' );
define( 'LOGGED_IN_SALT',   'DzHk!e?_U**Bzf_Z2K8=ay[E&UcJzT_n9E^m38HtMW3]L/$gj91ArYFHi%>E)v$5' );
define( 'NONCE_SALT',       'sjbe.E_T~y?IoOj[|B7|t5Y42|Q?i(]lvF}Ob9HN>(1-Y*9I>v))>S:chn6^E&ww' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
