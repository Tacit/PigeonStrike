using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class UnitScript : MonoBehaviour {

    public Vector2 velocity = new Vector2(2, 0);
    public float maxOffset = 1;
    public Vector2 size = new Vector2(0.35f, 2f);
    public Transform pooPrefab;
    // Use this for initialization
    void Start () {
        var bc = GetComponent<BoxCollider2D>();
        var dy = Random.Range(0f, maxOffset);
        bc.size = new Vector2(size.x, size.y + dy);
        bc.offset = new Vector2(0f, dy / -2);
        Destroy(gameObject,30);
	}
	
	// Update is called once per frame
	void Update () {
		
	}

    private void FixedUpdate()
    {
        var rb = GetComponent<Rigidbody2D>();
        rb.velocity = velocity;
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.gameObject.tag != "Poo")
            return;

        var poo = Instantiate<Transform>(pooPrefab);
        var collider1 = gameObject.GetComponent<Collider2D>();
        var minY = collider1.bounds.min.y - collider1.offset.y * 2;
        var maxY = collider1.bounds.max.y + collider1.offset.y * 2;
        poo.position = new Vector3(collider1.bounds.center.x, Random.Range(minY, maxY));
        poo.gameObject.GetComponent<Rigidbody2D>().velocity = new  Vector2(gameObject.GetComponent<Rigidbody2D>().velocity.x, 0);
        Destroy(collision.gameObject);
    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        if(collision.gameObject.tag == "unit")
        {
            Physics2D.IgnoreCollision(collision.gameObject.GetComponent<BoxCollider2D>(), GetComponent<BoxCollider2D>());
        }
    }
}
