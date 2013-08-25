import javax.swing.KeyStroke.*;
import javax.swing.*;


KeyStroke ks = javax.swing.KeyStroke.getKeyStroke(Character.valueOf('c'.charAt(0)));
//KeyStroke ks = javax.swing.KeyStroke.getKeyStroke(Character.valueOf('c'.charAt(0)), java.awt.event.InputEvent.SHIFT_DOWN_MASK | java.awt.event.InputEvent.CTRL_DOWN_MASK);
System.out.println(ks.toString());
System.out.println(ks.getKeyCode());
System.out.println(ks.getKeyChar());
