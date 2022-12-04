using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class FireScript : MonoBehaviour {

    public Transform pooPrefab;
    public Text textPrefab;
    public float coolDown = 0.5f;
    private float cd;
    //public int ammo = 200;
    // Use this for initialization
    void Start () {
        cd = coolDown;
    }
	
	// Update is called once per frame
	void Update () {

        if (cd > 0)
        {
            cd -= Time.deltaTime;
        }

        bool isPoo = Input.GetButtonDown("Fire1") || Input.GetButtonDown("Fire2");
        if (isPoo)
        {
            Fire();
        }
    }

    private void FixedUpdate()
    {
        textPrefab.text = string.Format("Charges: {0}", GameManager.Instance.Ammo);
        if(GameManager.Instance.Ammo < 10)
        {
            textPrefab.color = Color.red;
        }
        else
        {
            textPrefab.color = Color.yellow;
        }
    }

    private void Fire()
    {
        if (!CanFire())
            return;

        cd = coolDown;
        GameManager.Instance.Ammo--;
        var poo = Instantiate(pooPrefab) as Transform;
        poo.position = new Vector3(transform.position.x, transform.position.y - 1);
    }

    private bool CanFire()
    {
        return cd <= 0 && GameManager.Instance.Ammo > 0;
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.gameObject.tag != "Charges")
            return;
        Destroy(collision.gameObject);
        GameManager.Instance.Ammo += 10;
    }
}
